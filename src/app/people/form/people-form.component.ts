import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/translation.service';
import { FormService } from 'src/app/shared/form.service';
import { People } from '../people.model';
import { CountryService } from 'src/app/settings/country/country.service';
import { filter, take } from 'rxjs/operators';
import { Country } from 'src/app/settings/country/country.model';
import { Subscription } from 'rxjs';
import { FlashService } from 'src/app/shared/flash/flash.service';
//import $ from "jquery";
declare var $: any;


@Component({
    selector: "people-form",
    templateUrl: "./people-form.component.html",
    providers: [
        FormService
    ]
})
export class PeopleFormComponent implements OnInit, OnDestroy {

    @Input() values: People = null;
    @Output() send = new EventEmitter<People>();

    public countries: Country[];
    private countrySub: Subscription;

    public form = new FormGroup({
        "firstName": new FormControl(null, Validators.required),
        "lastName": new FormControl(null),
        "sexe": new FormControl(null),
        "met_at": new FormControl(null, Validators.required),
        "metIn": new FormControl(null, Validators.required),
        "from": new FormControl(null)
    })

    constructor(
        public t: TranslationService,
        private countryService: CountryService,
        public f: FormService,
        private flash: FlashService
    ) {

    }

    ngOnInit() {
        this.f.form = this.form;
        this.f.element = "people";

        $("#sexe").bootstrapToggle();

        if (this.values) {
            if (this.values.sexe) {
                $("#sexe").bootstrapToggle("on");
            }
        } else {
            this.form.get("met_at").setValue(new Date().toISOString().substr(0, 10));
            this.form.get("sexe").setValue(true);
        }

        this.countryService.getList();

        this.countrySub = this.countryService.list
            .pipe(
                filter(list => list !== null),
            )
            .subscribe(countries => {
                this.countries = countries;
            });
    }

    onSubmit() {
        this.send.emit(this.form.value);
    }

    onAddCountry(e: Event) {
        e.preventDefault();

        $('#new_country').modal();
    }

    onCreateCountry(country: Country) {
        $('#new_country').modal('hide');

        this.countryService.add(country).subscribe(res => {
            this.flash.success(this.t.t('country.flash.created', country.name));
            this.form.get("from").setValue(res.id);
        });
    }

    ngOnDestroy() {
        this.countrySub.unsubscribe();
    }
}