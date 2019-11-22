import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import User from './user.model';

interface UserData {
  id: string;
  name: string;
  email: string;
  token: string;
  expireAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  current_user = new BehaviorSubject<User>(null);

  constructor(
    private api: HttpClient,
    private router: Router
  ) { }

  public autoLogin() {
    const userData: UserData = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.id, userData.name, userData.email, userData.token, new Date(userData.expireAt));

    if (loadedUser.token) {
      this.current_user.next(loadedUser);
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
    const user = new User(res.id, res.name, res.email, res.token, new Date(res.expireAt));
    this.current_user.next(user);
    localStorage.setItem("userData", JSON.stringify(res));
  }

  public emailTaken(email: string) {
    return this.api.post<{ taken: boolean }>("/user/emailTaken", { email });
  }

  logout() {
    this.current_user.next(null);
    localStorage.removeItem("userData");
    this.router.navigate(['/login']);
  }
}
