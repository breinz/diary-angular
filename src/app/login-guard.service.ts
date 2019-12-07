import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user/user.service';
import { Observable } from 'rxjs';
import { FlashService } from './shared/flash/flash.service';

@Injectable({ providedIn: "root" })
export class LoginGuard implements CanActivate {

    constructor(
        private router: Router,
        private user: UserService,
        private flash: FlashService
    ) { }

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean | UrlTree {

        if (this.user.loggedIn) {
            return true;
        }

        if (route.routeConfig.path !== "") {
            this.flash.error("Please log in to access this page");
            this.router.navigate(['/login']);
            return false;
        }
        console.log("return false");
        return false;
        //return this.router.parseUrl('/');
    }
}