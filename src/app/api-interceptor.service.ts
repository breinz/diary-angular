import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType, HttpHeaderResponse } from '@angular/common/http';
import { UserService } from './user/user.service';
import { Injectable } from '@angular/core';
import { take, exhaustMap, catchError, tap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { FlashService } from './shared/flash/flash.service';
import { LoadingStatusService } from './loading-status.service';

import { environment } from "../environments/environment";

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
        private flash: FlashService,
        private loader: LoadingStatusService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        console.groupCollapsed(req.url[0] == "/" ? req.method : "FILE");
        console.log(req.url);

        //console.log(req.url[0] == "/" ? ("API: " + req.method) : "FILE:", req.url);

        this.loader.loaderStart();

        return this.userService.current_user.pipe(
            take(1),
            exhaustMap(user => {

                let modifiedReq = req.clone();

                if (req.url[0] === "/") {
                    // Add api url
                    modifiedReq = modifiedReq.clone({
                        url: environment.api + req.url
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
                    //delay(1000),
                    tap(event => {
                        if (event.type === HttpEventType.Response) {
                            console.log(event.body);
                            console.groupEnd();
                            this.loader.loaderEnd();
                        }
                    }),
                    catchError((err: any) => {
                        console.log("--ERROR--");
                        console.groupEnd();
                        this.loader.loaderEnd();
                        if (err.error && err.error.error) {
                            switch (err.error.error) {
                                case "INVALID_USER":
                                case "INVALID_TOKEN":
                                case "OUTDATED_TOKEN":
                                    //this.userService.current_user.
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