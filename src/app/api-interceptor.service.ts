import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { UserService } from './user/user.service';
import { Injectable } from '@angular/core';
import { take, exhaustMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { FlashService } from './shared/flash/flash.service';

/**
 * Prepend the api url
 * 
 * Add the user's token as param (if available)
 */
@Injectable()
export class ApiInterceptorService implements HttpInterceptor {

    constructor(
        private userService: UserService,
        private router: Router,
        private flash: FlashService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        console.log(req.url[0] == "/" ? ("API: " + req.method) : "FILE:", req.url);

        return this.userService.current_user.pipe(
            take(1),
            exhaustMap(user => {
                let modifiedReq = req.clone();

                if (req.url[0] === "/") {
                    // Add api url
                    modifiedReq = modifiedReq.clone({
                        url: "http://localhost:3000/api" + req.url
                    });

                    // Add user token
                    if (user) {
                        modifiedReq = modifiedReq.clone({
                            params: modifiedReq.params.append("token", user.token)
                        });

                        modifiedReq = modifiedReq.clone({
                            params: modifiedReq.params.append("uid", user.id)
                        });
                    }
                }

                return next.handle(modifiedReq).pipe(
                    catchError((err: any) => {
                        if (err.error && err.error.error) {
                            switch (err.error.error) {
                                case "INVALID_USER":
                                case "INVALID_TOKEN":
                                    this.flash.error("Please login to access this page");
                                    this.router.navigate(['/login']);
                                    break;
                            }
                        }

                        return throwError(err);
                    })
                );
            }));

    }

}