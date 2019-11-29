import { OnInit, Component } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';
import { CountryService } from '../country.service';
import { Country } from '../country.model';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { Router } from '@angular/router';
import { LoadingStatusService } from 'src/app/loading-status.service';

@Component({
    selector: "new-country",
    templateUrl: "./new-country.component.html"
})
export class NewCountryComponent implements OnInit {
    constructor(
        public t: TranslationService,
        private service: CountryService,
        private flash: FlashService,
        private router: Router,
        private loader: LoadingStatusService
    ) {

    }

    ngOnInit() {

    }

    onSubmit(country: Country) {
        this.loader.loaderStart();
        this.service.add(country).subscribe(res => {
            this.loader.loaderEnd();
            this.flash.success(this.t.t("country.flash.created", country.name));
            this.router.navigate(['/settings/country']);
        });
    }
}