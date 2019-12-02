import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';
import { FormService } from 'src/app/shared/form.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Country } from '../country.model';

@Component({
    selector: "country-form",
    templateUrl: "./country-form.component.html",
    providers: [
        FormService
    ]
})
export class CountryForm implements OnInit {

    @Input() country: Country = null;
    @Output() send = new EventEmitter<Country>();

    form = new FormGroup({
        "name": new FormControl(null, Validators.required)
    });

    constructor(
        public t: TranslationService,
        public f: FormService) {

    }

    ngOnInit() {
        this.f.form = this.form;
        this.f.element = "country";

        if (this.country) {
            this.form.setValue({
                "name": this.country.name
            });
        }
    }

    onSubmit() {
        if (this.form.invalid) {
            return;
        }

        this.send.emit(this.form.value);
    }

}