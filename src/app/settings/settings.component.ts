import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../app-header/header.service';

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {

    public active: string;

    constructor(
        private headerService: HeaderService
    ) { }

    ngOnInit() {
        this.headerService.subCategory.subscribe(cat => {
            this.active = cat;
        })
    }
}