import { Component, OnInit, OnDestroy } from "@angular/core";
import { TranslationService } from 'src/app/translation.service';
import { CountryService } from './country.service';
import { Country } from './country.model';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { Router } from '@angular/router';

@Component({
    selector: "app-country",
    templateUrl: "./country.component.html"
})
export class CountryComponent implements OnInit, OnDestroy {

    public countries: Country[] = [];

    private sub: Subscription;

    constructor(
        private service: CountryService,
        public t: TranslationService,
        private flash: FlashService,
        private router: Router
    ) {

    }

    ngOnInit() {
        this.sub = this.service.list.pipe(filter(list => list !== null)).subscribe(list => {
            this.countries = list;
        })
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

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}