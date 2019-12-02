import { Injectable } from '@angular/core';
import { vsprintf } from "sprintf-js";

import { UserService } from './user/user.service.js';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeValue } from '@angular/platform-browser';

@Injectable({ providedIn: "root" })
export class TranslationService {

    private data: any = null;
    private default_data: any = null;

    constructor(private http: HttpClient,
        private sanitizer: DomSanitizer) {
    }

    /**
     * @see app.module APP_INITIALIZER
     */
    public preload(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.http.get("assets/lang/en.json").subscribe(
                data => {
                    this.default_data = data;
                    console.log("TRANSLATION: en loaded");
                    resolve(true);
                },
                err => {
                    reject(err);
                });
        });
    }

    public init(user: UserService) {

        /*
        this.http.get("assets/lang/en.json").subscribe(data => {
            this.default_data = data;
        });*/

        user.current_user.subscribe(loggedInUser => {
            if (loggedInUser) {
                try {
                    this.http.get("assets/lang/" + loggedInUser.lang + ".json").subscribe(data => {
                        console.log("TRANSLATION: " + loggedInUser.lang + " loaded");
                        this.data = data;
                    });
                } catch (error) {
                    console.error("Error loading lang ", loggedInUser.lang);
                    this.data = null;
                }
            } else {
                this.data = null;
            }
        });

    }

    /**
     * Get a translation
     * @param str The path to the translation in json
     * @param args Args used to replace %s
     */
    public t(str: string, ...args: (string | number)[]): string {
        //console.log(this.data);
        return this._t(str, false, args, this.data) as string;
    }

    public st(str: string, ...args: (string | number)[]): SafeValue {
        return this._t(str, true, args, this.data);
    }

    /**
     * Get a pluralisation
     * @param str The path to the pluralisation in json
     * @param count Value used to pluralize
     */
    public p(str: string, count: number): string {
        return this._p(str, count, this.data);
    }

    private default_t(str: string, useSanitizer: boolean, args: (string | number)[]): string | SafeValue {
        return this._t(str, useSanitizer, args, this.default_data);
    }

    private _t(str: string, useSanitizer: boolean, args: (string | number)[], dataset: any): string | SafeValue {
        const fallback: any = (!dataset || dataset == this.data) ? this.default_t.bind(this) : this.writeMissing.bind(this);

        let ar = str.split(".");

        try {
            ar.forEach(step => {
                dataset = dataset[step];
            });
        } catch (error) {
            return fallback(str, useSanitizer, args);
        }

        if (!dataset || dataset.length == 0) {
            return fallback(str, useSanitizer, args);
        }

        const res = vsprintf(dataset, args);
        if (useSanitizer) {
            return this.sanitizer.bypassSecurityTrustHtml(res);
        }

        return res;
    }

    private default_p(str: string, count: number): string {
        return this._p(str, count, this.default_data);
    }

    private _p(str: string, count: number, dataset: any): string {
        const fallback = dataset == this.data ? this.default_p.bind(this) : this.writeMissingP.bind(this);

        let ar = str.split(".");

        try {
            ar.forEach(step => {
                dataset = dataset[step];
            });
        } catch (error) {
            return fallback(str, count);
        }

        if (!dataset || dataset.length == 0) {
            return fallback(str, count);
        }

        dataset = count == 0 ? dataset.none : count == 1 ? dataset.one : dataset.many;

        return dataset;
    }

    private writeMissing(str: string, useSanitizer: boolean, params: any, pluralisation: boolean = false): string {
        console.error("WRITE MISSING: ", str);
        let ar = str.split(".");

        // No writing here (not in Node env)

        return `*${ar[ar.length - 1][0].toUpperCase()}${ar[ar.length - 1].substr(1)}`;
    }

    private writeMissingP(str: string, count: number): string {
        console.error("WRITE MISSING PLURALISATION: ", str);
        let ar = str.split(".");

        // No writing here (not in Node env)

        return `*${ar[ar.length - 1][0].toUpperCase()}${ar[ar.length - 1].substr(1)}`;

    }

}