import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { Injectable } from '@angular/core';
import { take, exhaustMap } from 'rxjs/operators';

/**
 * Prepend the api url
 * 
 * Add the user's token as param (if available)
 */
@Injectable()
export class ApiInterceptorService implements HttpInterceptor {

    constructor(private userService: UserService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return this.userService.current_user.pipe(
            take(1),
            exhaustMap(user => {

                // Add api url
                let modifiedReq = req.clone({
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

                return next.handle(modifiedReq);
            }));


    }

}