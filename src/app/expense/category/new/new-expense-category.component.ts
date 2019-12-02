import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpenseCategoryService } from '../expense-category.service';
import { Router } from '@angular/router';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { TranslationService } from 'src/app/translation.service';

@Component({
    selector: "new-expense-category",
    templateUrl: "./new-expense-category.component.html"
})
export class NewExpenseCategoryComponent implements OnInit {

    form = new FormGroup({
        "name": new FormControl(null, Validators.required),
        "icon": new FormControl(null, Validators.required),
        "color": new FormControl(null, Validators.required),
    });

    constructor(
        private api: ExpenseCategoryService,
        private router: Router,
        private flash: FlashService,
        public t: TranslationService
    ) { }

    ngOnInit() {
    }

    public onSubmit() {
        if (this.form.invalid) {
            return;
        }

        this.api.add(this.form.value).subscribe(res => {
            this.flash.success(this.t.t("expense.category.flash.created"));
            this.form.reset();
            this.router.navigate(["/expense/category"]);
        });

    }

}