import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../app-header/header.service';
import { BreadcrumbService } from '../layout/breadcrumb/breadcrumb.service';

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {

    public active: string;

    constructor(
        private headerService: HeaderService,
        private bc: BreadcrumbService
    ) { }

    ngOnInit() {
        this.bc.build("settings");

        this.headerService.subCategory.subscribe(cat => {
            this.active = cat;
        })
    }
}