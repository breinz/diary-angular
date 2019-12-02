import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { EventCategoryService } from './event-category.service';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { TranslationService } from 'src/app/translation.service';

@Injectable({ providedIn: "root" })
export class EventCategoryGuard implements CanActivate {

    constructor(
        private service: EventCategoryService,
        private flash: FlashService,
        private router: Router,
        private t: TranslationService
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> |
        boolean {
        if (route.routeConfig.path === "category/:id" || route.routeConfig.path === "category/:id/edit") {
            return this.loadEventCategory(route.params.id);
        }

        return true;
    }

    private loadEventCategory(id: string): Promise<boolean> | boolean {
        return new Promise((resolve, reject) => {

            this.service.getCategory(id).subscribe(
                res => {
                    resolve(true);
                },
                err => {
                    this.flash.error(this.t.t('expense.flash.not_found'));
                    this.router.navigate(['/event/category']);
                    reject();
                });
        });
    }
}