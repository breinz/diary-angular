import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { EventService } from './event.service';
import { FlashService } from '../shared/flash/flash.service';
import { TranslationService } from '../translation.service';

@Injectable({ providedIn: "root" })
export class EventGuard implements CanActivate {

    constructor(
        private eventService: EventService,
        private flash: FlashService,
        private router: Router,
        private t: TranslationService
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> |
        boolean {

        const populated = route.routeConfig.path === ":id";

        if (route.routeConfig.path === ":id" || route.routeConfig.path === ":id/edit") {
            return this.loadEvent(route.params.id, populated);
        }

        return true;
    }

    private loadEvent(id: string, populated: boolean): Promise<boolean> | boolean {
        return new Promise((resolve, reject) => {
            this.eventService.getEvent(id, populated).subscribe(res => {
                resolve(true);
            }, err => {
                this.flash.error(this.t.t('event.flash.not_found'));
                this.router.navigate(['/event']);
                reject();
            })
        });
    }


}