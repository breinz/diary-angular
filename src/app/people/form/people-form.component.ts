import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/translation.service';
import { FormService } from 'src/app/shared/form.service';
import { People } from '../people.model';
//import $ from "jquery";
declare var $: any;


@Component({
    selector: "people-form",
    templateUrl: "./people-form.component.html"
})
export class PeopleFormComponent implements OnInit {

    @Input() values: People = null;
    @Output() send = new EventEmitter<People>();

    public form = new FormGroup({
        "firstName": new FormControl(null, Validators.required),
        "lastName": new FormControl(null),
        "sex": new FormControl(null),
        "met_at": new FormControl(null, Validators.required),
        "metIn": new FormControl(null, Validators.required)
    })

    constructor(
        public t: TranslationService,
        public f: FormService
    ) {

    }

    ngOnInit() {
        this.f.form = this.form;
        this.f.element = "people";

        $("#sex").bootstrapToggle();

        if (this.values) {
            if (this.values.sex) {
                $("#sex").bootstrapToggle("on");
            }
        } else {
            this.form.get("met_at").setValue(new Date().toISOString().substr(0, 10));
            this.form.get("sex").setValue(true);
        }
    }

    onSubmit() {
        this.send.emit(this.form.value);
    }
}