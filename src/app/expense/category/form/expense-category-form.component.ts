import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormService } from 'src/app/shared/form.service';
import { TranslationService } from 'src/app/translation.service';
import { FormGroup } from '@angular/forms';

@Component({
    selector: "expense-category-form",
    templateUrl: "./expense-category-form.component.html",
    providers: [
        FormService
    ]
})
export class ExpenseCategoryForm implements OnInit {

    @Input() form: FormGroup;
    @Output() form_submit = new EventEmitter();

    constructor(public formService: FormService,
        public t: TranslationService) {

    }

    ngOnInit() {
        this.formService.form = this.form;
        this.formService.element = "expense-category";
    }

    public onSubmit() {
        this.form_submit.emit();
    }
}