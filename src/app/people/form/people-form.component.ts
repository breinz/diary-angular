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
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
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
    @Input() people: People;
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

        if (this.people) {
            this.form.setValue({
                "firstName": this.people.firstName,
                "lastName": this.people.lastName,
                "sexe": !!this.people.sexe,
                "met_at": new Date(this.people.met_at).toISOString().substr(0, 10),
                "metIn": this.people.metIn,
                "from": this.people.from ? this.people.from._id : null
            });
            if (!!this.people.sexe) {
                $("#sexe").bootstrapToggle("on");
            }
        } else if (this.values) { // !?!?!?
            if (this.values.sexe) {
                $("#sexe").bootstrapToggle("on");
            }
        } else {
            this.form.get("met_at").setValue(new Date().toISOString().substr(0, 10));
            $("#sexe").bootstrapToggle("off");
        }

        // Need to update ReactiveForm myself since a programmatically (by bootstrap toggle) change isn't reflected
        const f = this.form;
        $("#sexe").change(function () {
            f.get('sexe').setValue($(this).prop('checked'))
        })

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