import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class LoginService {

  constructor(private api: HttpClient) { }

  login(values: { email: string, password: string }) {
    return this.api
      .post<{ success: Boolean, token: string }>("/login", values);
  }
}
