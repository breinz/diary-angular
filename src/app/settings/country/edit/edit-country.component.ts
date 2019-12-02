import { OnInit, Component } from '@angular/core';
import { CountryService } from '../country.service';
import { Country } from '../country.model';
import { filter, take, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { TranslationService } from 'src/app/translation.service';
import { Location } from '@angular/common';

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
        private location: Location
    ) {

    }

    ngOnInit() {
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
            this.country = country;
        });
    }

    onSend(values: Country) {
        this.service.patch(this.country, values).subscribe(res => {
            this.flash.success(this.t.t('country.flash.edited'));
            this.location.back();

        })
    }
}