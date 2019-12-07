import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../user.service';
import { FormErrorService } from "../../shared/form/form-error/form-error.service";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { BreadcrumbService } from 'src/app/layout/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  apiError = false;

  public form: FormGroup;

  constructor(
    private userService: UserService,
    private formError: FormErrorService,
    private router: Router,
    private flash: FlashService,
    private bc: BreadcrumbService
  ) { }

  ngOnInit() {
    this.bc.build('');

    this.form = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email], this.emailTaken.bind(this)),
      "password": new FormControl(null, [Validators.required, Validators.minLength(4)]),
      "password_repeat": new FormControl(null, [Validators.required, this.passwordsMatch.bind(this)]),
      "name": new FormControl(null, [Validators.required])
    });

  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.apiError = false;

    // TODO: Sign in doesn't log in !
    this.userService.signin(this.form.value).subscribe(
      result => {
        this.flash.success("Successfully signed in");
        this.form.reset();
        this.router.navigate(["/"]);

      },
      error => {
        for (let key in error.error.errors) {
          if (error.error.errors.hasOwnProperty(key)) {

            let a = {};
            a[error.error.errors[key]] = true;
            this.form.get(key).setErrors(a);
          }
        }
        this.apiError = true;
      }
    )
  }

  hasError(key: string): boolean {
    const control = this.form.get(key);
    if (control) {
      return control.invalid && control.touched;
    }

    return false;
  }

  getErrorMessage(key: string): string {
    const input = this.form.get(key);
    return this.formError.getMessage(input, key);
  }

  private passwordsMatch() {
    if (!this.form) return null;

    if (this.form.get("password").value !== this.form.get("password_repeat").value) {
      return { "no_match": true }
    }

    return null;
  }

  private emailTaken(): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {

      const email = this.form.get("email").value;

      return this.userService.emailTaken(email).subscribe(
        res => {
          if (res.taken) {
            resolve({ taken: res.taken });
          } else {
            resolve(null);
          }
        }
      );
    });
  }

}
