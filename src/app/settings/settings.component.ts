import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from '../app-header/header.service';
import { BreadcrumbService } from '../layout/breadcrumb/breadcrumb.service';
import { Router, NavigationEnd, } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit, OnDestroy {

    public active: string;
    private sub: Subscription;

    constructor(
        private headerService: HeaderService,
        private bc: BreadcrumbService,
        private router: Router
    ) { }

    ngOnInit() {
        this.sub = this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                if (e.url === "/settings") {
                    this.bc.build("settings");
                }
            }
        })
        this.bc.build("settings");

        this.headerService.subCategory.subscribe(cat => {
            this.active = cat;
        })
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}