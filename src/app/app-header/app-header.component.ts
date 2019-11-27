import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs';
import User from '../user/user.model';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {

  current_userSub: Subscription;
  isAuthenticated: boolean;
  current_user: User;

  constructor(
    private userService: UserService,
    public t: TranslationService
  ) { }

  ngOnInit() {
    this.current_userSub = this.userService.current_user.subscribe(user => {
      this.isAuthenticated = !!user;
      this.current_user = user;
    });
  }

  test() {
    this.userService.test();
  }

  logout() {
    this.userService.logout();
  }

  ngOnDestroy() {
    this.current_userSub.unsubscribe();
  }
}
