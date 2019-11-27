import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hasError = false;

  form = new FormGroup({
    "email": new FormControl(null, [Validators.required, Validators.email]),
    "password": new FormControl(null, [Validators.required, Validators.minLength(4)])
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private flash: FlashService,
    public t: TranslationService
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.userService.login(this.form.value).subscribe(
      res => {
        this.form.reset();
        this.flash.success(this.t.t("login.flash.loggedin"));
        this.router.navigate(["/"]);
      }, error => {
        this.form.patchValue({ password: "" });
        this.hasError = error.message;
      });
  }

}
