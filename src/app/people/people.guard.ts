import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PeopleService } from './people.service';
import { FlashService } from '../shared/flash/flash.service';
import { TranslationService } from '../translation.service';
import { filter, take } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class PeopleGuard implements CanActivate {

    constructor(
        private service: PeopleService,
        private router: Router,
        private flash: FlashService,
        private t: TranslationService
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (route.routeConfig.path === "deleted") {
            return this.canActivateDeleted();
        }

        if (route.routeConfig.path === ":id" || route.routeConfig.path === ":id/edit") {
            return this.peopleExist(route.params.id);
        }

        return true;
    }

    /**
     * Can activate deleted if there is at least one delete people
     */
    private canActivateDeleted(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            this.service.list
                .pipe(
                    filter(list => list !== null),
                    take(1)
                ).subscribe(list => {

                    // Look for a deleted people
                    for (const people of list) {
                        if (people.deleted) {
                            return resolve(true);
                        }
                    }

                    // None found, redirect
                    this.flash.error(this.t.t("people.flash.no_deleted"));
                    this.router.navigate(["/people"]);
                    return resolve(false);
                });


        })
    }

    private peopleExist(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.service.getPeople(id).subscribe(res => {
                resolve(true);
            }, err => {
                this.flash.error("people.flash.not_found");
                this.router.navigate(["/people"]);
                return reject();
            })
        });
    }

}