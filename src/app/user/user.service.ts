import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, BehaviorSubject, pipe } from 'rxjs';
import { tap, catchError, take } from 'rxjs/operators';
import { Router } from '@angular/router';

import User from './user.model';
import { FlashService } from '../shared/flash/flash.service';
import { TranslationService } from '../translation.service';

interface UserData {
  id: string;
  name: string;
  email: string;
  token: string;
  expireAt: string;
  lang: string;
}

@Injectable({ providedIn: "root" })
export class UserService {

  public current_user = new BehaviorSubject<User>(null);
  public loggedIn: boolean = false;

  constructor(
    private api: HttpClient,
    private router: Router,
    private flash: FlashService,
    private t: TranslationService
  ) {
  }

  test() {
    this.current_user.pipe(take(1)).subscribe(user => {
      user.lang = user.lang == "en" ? "fr" : "en";
      this.current_user.next(user);
    }

    )
  }

  public autoLogin() {
    const userData: UserData = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.id, userData.name, userData.email, userData.token, new Date(userData.expireAt), userData.lang);

    if (loadedUser.token) {
      console.log("auto logged in");
      this.current_user.next(loadedUser);
      this.loggedIn = true;


    }
  }

  public login(formData: any) {
    return this.api
      .post<UserData>("/login", formData)
      .pipe(
        tap(res => this._logIn(res))
      );
  }

  public signin(formData: any) {
    return this.api
      .post<UserData>("/signin", formData)
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        tap(res => this._logIn(res))
      );
  }

  private _logIn(res: UserData) {
    const user = new User(res.id, res.name, res.email, res.token, new Date(res.expireAt), res.lang);
    this.current_user.next(user);
    localStorage.setItem("userData", JSON.stringify(res));
    this.loggedIn = true;
  }

  public emailTaken(email: string) {
    return this.api.post<{ taken: boolean }>("/user/emailTaken", { email });
  }

  logout() {
    this.flash.success(this.t.t("login.flash.loggedout"));

    this.current_user.next(null);

    localStorage.removeItem("userData");

    this.router.navigate(['/login']);

    this.loggedIn = false;
  }
}
