import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';
import { TranslationService } from './translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService,
    private t: TranslationService
  ) { }

  ngOnInit() {
    this.userService.autoLogin();

    this.t.init(this.userService);

  }
}
