import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../user.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    this.userService.login(this.form.value).subscribe(
      res => {
        this.form.reset();
        this.router.navigate(["/"]);
      }, error => {
        this.form.patchValue({ password: "" });
        this.hasError = error.message;
      });
  }

}
