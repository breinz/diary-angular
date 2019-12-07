import { OnInit, Component } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { TranslationService } from 'src/app/translation.service';
import { BreadcrumbService } from 'src/app/layout/breadcrumb/breadcrumb.service';

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    public loggedIn: boolean;

    constructor(
        private userService: UserService,
        public t: TranslationService,
        private bc: BreadcrumbService
    ) {

    }

    ngOnInit() {
        this.bc.build('');
        this.loggedIn = this.userService.loggedIn;
    }

    onDemo(e: Event) {
        e.preventDefault();
    }
}