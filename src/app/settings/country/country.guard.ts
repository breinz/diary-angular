import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CountryService } from './country.service';
import { filter, take } from 'rxjs/operators';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { TranslationService } from 'src/app/translation.service';

@Injectable({ providedIn: "root" })
export class CountryGuard implements CanActivate {

    constructor(
        private service: CountryService,
        private t: TranslationService,
        private flash: FlashService,
        private router: Router
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const path = route.routeConfig.path;

        if (path === "country/:id/edit" || path === "country/:id") {
            return this.exists(route.params.id);
        }
        return true;
    }

    private exists(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.service.list.pipe(
                filter(list => list !== null),
                take(1)
            ).subscribe(list => {
                for (const country of list) {
                    if (country._id === id) {
                        return resolve(true);
                    }

                }
                this.flash.error(this.t.t("country.flash.not_found"));
                this.router.navigate(["/settings/country"]);
                reject();
            });
        });
    }
}