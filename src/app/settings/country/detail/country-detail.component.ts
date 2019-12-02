import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountryService } from '../country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { TranslationService } from 'src/app/translation.service';
import { filter, map } from 'rxjs/operators';
import { Country } from '../country.model';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from 'src/app/layout/breadcrumb/breadcrumb.service';

@Component({
    selector: "country-detail",
    templateUrl: "./country-detail.component.html"
})
export class CountryDetailComponent implements OnInit, OnDestroy {

    public country: Country;

    private sub: Subscription;

    constructor(
        private service: CountryService,
        private route: ActivatedRoute,
        private flash: FlashService,
        public t: TranslationService,
        private router: Router,
        private bc: BreadcrumbService
    ) { }

    ngOnInit() {
        this.sub = this.service.list.pipe(
            filter(list => list !== null),
            map(list => {
                for (const country of list) {
                    if (country._id === this.route.snapshot.params.id) {
                        return country;
                    }
                }
            })
        ).subscribe(country => {
            this.country = country;

            this.bc.build("country", country);
        });
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