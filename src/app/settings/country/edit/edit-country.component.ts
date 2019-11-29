import { OnInit, Component } from '@angular/core';
import { CountryService } from '../country.service';
import { Country } from '../country.model';
import { filter, take, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { TranslationService } from 'src/app/translation.service';
import { Location } from '@angular/common';
import { LoadingStatusService } from 'src/app/loading-status.service';

@Component({
    selector: "edit-country",
    templateUrl: "./edit-country.component.html"
})
export class EditCountryComponent implements OnInit {

    public country: Country;

    constructor(
        private service: CountryService,
        private route: ActivatedRoute,
        private flash: FlashService,
        private t: TranslationService,
        private location: Location,
        private loader: LoadingStatusService
    ) {

    }

    ngOnInit() {
        this.loader.loaderStart();
        this.service.list.pipe(
            filter(list => list !== null),
            map(list => {
                for (const country of list) {
                    if (country._id === this.route.snapshot.params.id) {
                        return country;
                    }
                }
            }),
            take(1)
        ).subscribe(country => {
            this.loader.loaderEnd();
            this.country = country;
        });
    }

    onSend(values: Country) {
        this.loader.loaderStart();
        this.service.patch(this.country, values).subscribe(res => {
            this.loader.loaderEnd();
            this.flash.success(this.t.t('country.flash.edited'));
            this.location.back();

        })
    }
}