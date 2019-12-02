import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';
import { People } from '../people.model';
import { PeopleService } from '../people.service';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { Router } from '@angular/router';
import { Country } from 'src/app/settings/country/country.model';

@Component({
    selector: "new-people",
    templateUrl: "./new-people.component.html"
})
export class NewPeopleComponent implements OnInit {

    countries: Country[];

    constructor(
        public t: TranslationService,
        private service: PeopleService,
        private flash: FlashService,
        private router: Router
    ) { }

    ngOnInit() {

    }

    onSend(people: People) {
        this.service.add(people).subscribe(res => {
            this.flash.success(this.t.t('people.flash.created'));
            this.router.navigate(["/people"]);
        });
    }

}