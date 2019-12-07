import { Component, OnInit, OnDestroy } from "@angular/core";
import { TranslationService } from 'src/app/translation.service';
import { CountryService } from './country.service';
import { Country } from './country.model';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/layout/breadcrumb/breadcrumb.service';

@Component({
    selector: "app-country",
    templateUrl: "./country.component.html"
})
export class CountryComponent implements OnInit, OnDestroy {

    public loading = true;
    public empty = true;

    public countries: Country[] = [];

    private sub: Subscription;

    constructor(
        private service: CountryService,
        public t: TranslationService,
        private flash: FlashService,
        private router: Router,
        private bc: BreadcrumbService
    ) {

    }

    ngOnInit() {
        this.bc.build("country");

        this.service.getList();

        this.sub = this.service.list.subscribe(list => {
            if (!list) {
                this.loading = true;
                return;
            }

            this.loading = false;
            this.countries = list;

            this.empty = this.countries.length === 0;
        }
        );
    }

    onDelete(e: Event, country: Country) {
        e.preventDefault();

        if (confirm(this.t.t("country.confirm.delete", country.name))) {
            this.service.delete(country).subscribe(res => {
                this.flash.success(this.t.t("country.flash.deleted", country.name));
                this.router.navigate(["/settings/country"]);
            })
        }
    }

    previewPeople(country: Country): string {
        let i = 0;
        let preview = "";
        for (const people of country.peoples) {

            preview += people.firstName + ", ";
            if (i++ >= 2) break;
        }
        if (country.peoples.length > 3) {
            preview += "+ " + (country.peoples.length - 3) + ", ";
        }
        return preview.substr(0, preview.length - 2);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}