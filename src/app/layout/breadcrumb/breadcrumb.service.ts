import { Injectable } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';
import { Subject } from 'rxjs';
import { Event } from 'src/app/event/event.model';
import EventCategory from 'src/app/event/category/eventCategory.model';
import { Country } from 'src/app/settings/country/country.model';

@Injectable({ providedIn: "root" })
export class BreadcrumbService {

    public bc = new Subject<(string | string[])[]>();// = [];

    /** @private use only */
    private _bc: (string | string[])[];

    constructor(
        private t: TranslationService
    ) {

    }

    /**
     * Tries to build the breadcrumb based on the elements given
     * 
     * @param {string} type Element type (eg. event, people, etc.)
     * @param {any} el Element
     * @param {string} action Action (new, edit, etc.)
     */
    public build(type: string, el?: any, action?: string) {
        this._bc = [];

        switch (type) {
            case "diary":
                //this._bc.push([this.t.t("diary.breadcrumb.index"), "/"]);
                if (action) {
                    this._bc.push([this.t.t("global.title"), '/'], action);
                }
                break;
            case "expense":
                this._build(el, action, "_id", "/expense", "expense.breadcrumb.");
                break;
            case "expenseCategory":
                this._bc.push([this.t.t("expense.breadcrumb.index"), "/expense"]);
                this._build(el, action, "name", "/expense/category", "expense.category.breadcrumb.");
                break;
            case "people":
                this._build(el, action, "firstName", "/people", "people.breadcrumb.");
                break;
            case "event":
                this._build(el, action, "title", "/event", "event.breadcrumb.");
                break;
            case "eventCategory":
                this._bc.push([this.t.t("event.breadcrumb.index"), "/event"]);
                this._build(el, action, "name", "/event/category", "event.category.breadcrumb.");
                break;
            case "settings":
                this._bc.push(this.t.t("settings.breadcrumb.index"));
                break;
            case "country":
                this._bc.push([this.t.t("settings.breadcrumb.index"), "/settings"]);
                this._build(el, action, "name", "/settings/country", "country.breadcrumb.");
                break;

            default:
                break;
        }


        this.bc.next(this._bc);
    }

    /**
     * @private
     * Build the 'classic' breadcrumb :
     * - category
     * - element
     * - action
     * 
     * @param el Element (can be undefined)
     * @param action Action (can be undefined)
     * @param nameKey Key in the element to retrieve the title
     * @param link Link to the category
     * @param t Translation key
     */
    private _build(el: any, action: string, nameKey: string, link: string, t: string) {
        if (el || action) {
            this._bc.push([this.t.t(t + "index"), link]);
        } else {
            this._bc.push(this.t.t(t + "index"));
        }
        if (el) {
            if (action) {
                this._bc.push([el[nameKey], link + "/" + el._id]);
            } else {
                this._bc.push(el[nameKey]);
            }
        }
        if (action) {
            this._bc.push(this.t.t(t + action))
        }
    }
}