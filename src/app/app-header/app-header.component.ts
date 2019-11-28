import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user/user.service';
import { Subscription } from 'rxjs';
import User from '../user/user.model';
import { TranslationService } from '../translation.service';
import { LoadingStatusService } from '../loading-status.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit, OnDestroy {

  public isAuthenticated: boolean;
  public current_user: User;
  private current_userSub: Subscription;

  public loading: boolean;
  private loader_sub: Subscription;

  constructor(
    private userService: UserService,
    public t: TranslationService,
    private loader: LoadingStatusService
  ) { }

  ngOnInit() {
    this.current_userSub = this.userService.current_user.subscribe(user => {
      this.isAuthenticated = !!user;
      this.current_user = user;
    });

    this.loader_sub = this.loader.loading.subscribe(res => {
      this.loading = res;
    })
  }

  test() {
    this.userService.test();
  }

  logout() {
    this.userService.logout();
  }

  ngOnDestroy() {
    this.current_userSub.unsubscribe();
    this.loader_sub.unsubscribe();
  }
}
