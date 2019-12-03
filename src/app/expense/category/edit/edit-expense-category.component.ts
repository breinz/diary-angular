import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ExpenseCategory } from '../expense-category.model';
import { ExpenseCategoryService } from '../expense-category.service';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { TranslationService } from 'src/app/translation.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { BreadcrumbService } from 'src/app/layout/breadcrumb/breadcrumb.service';

@Component({
    selector: "edit-expense-category",
    templateUrl: "./edit-expense-category.component.html"
})
export class EditExpenseCategoryComponent implements OnInit, OnDestroy {

    private category: ExpenseCategory;
    private sub: Subscription;

    form = new FormGroup({
        "name": new FormControl(null, Validators.required),
        "icon": new FormControl(null, Validators.required),
        "color": new FormControl(null, Validators.required),
    });

    constructor(
        private route: ActivatedRoute,
        private categoryService: ExpenseCategoryService,
        private flash: FlashService,
        private t: TranslationService,
        private location: Location,
        private bc: BreadcrumbService
    ) {

    }

    ngOnInit() {
        const id = this.route.snapshot.params["id"];
        this.sub = this.categoryService.find(id).subscribe(category => {
            if (category) {

                this.category = category;

                this.bc.build("expenseCategory", this.category, "edit");

                this.form.setValue({
                    "name": this.category.name,
                    "icon": this.category.icon,
                    "color": this.category.color
                });
            }
        });
        // this.sub = this.categoryService.list.subscribe(categories => {
        //     if (!categories) return;

        //     const list_id = this.route.snapshot.params["id"];
        //     this.category = categories[list_id];

        // });

    }

    public onSubmit() {
        this.categoryService.edit(this.category, this.form.value).subscribe(res => {
            this.flash.success(this.t.t("expense.category.flash.edited"))

            this.location.back();

        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}