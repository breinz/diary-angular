import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountryService } from '../country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { TranslationService } from 'src/app/translation.service';
import { LoadingStatusService } from 'src/app/loading-status.service';
import { filter, map, take } from 'rxjs/operators';
import { Country } from '../country.model';
import { Subscription } from 'rxjs';

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
        private loader: LoadingStatusService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loader.loaderStart();
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
            this.loader.loaderEnd();
            this.country = country;
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