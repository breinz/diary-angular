import { Component, OnInit, Sanitizer, OnDestroy } from '@angular/core';
import { ExpenseCategoryService } from './expense-category.service';
import { ExpenseCategory } from './expense-category.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/translation.service';

@Component({
    selector: "app-expense-category",
    templateUrl: "./expense-category.component.html"
})
export class ExpenseCategoryComponent implements OnInit, OnDestroy {

    public categories: ExpenseCategory[] = [];
    public show_deleted: boolean = false;

    private sub: Subscription;

    constructor(
        private service: ExpenseCategoryService,
        private sanitizer: DomSanitizer,
        private router: Router,
        private flash: FlashService,
        public t: TranslationService
    ) {

    }

    public ngOnInit() {
        this.sub = this.service.list.subscribe(list => {
            if (!list) return;
            this.categories = list;
        })
    }

    getIconColor(attr: string, color: string) {
        let s = attr + ":";
        return this.sanitizer.bypassSecurityTrustStyle(s + color);
    }

    onEdit(category: ExpenseCategory, event: Event) {
        event.preventDefault();

        this.router.navigate(["/expense/category/" + category._id + "/edit"]);
    }

    onDelete(category: ExpenseCategory, event: Event) {
        event.preventDefault();

        if (confirm(this.t.t("expense.category.confirm.delete"))) {
            this.service.delete(category).subscribe(
                res => {
                    this.flash.success(this.t.t("expense.category.flash.deleted"));
                },
                err => {
                    this.flash.error(this.t.t("expense.category.flash.not_found"));
                });
        }
    }

    onRecover(category: ExpenseCategory, event: Event) {
        event.preventDefault();
        this.service.recover(category).subscribe(res => {
            this.flash.success(this.t.t("expense.category.flash.recovered"));
        });

    }

    onRemove(category: ExpenseCategory, event: Event) {
        event.preventDefault();

        if (confirm(this.t.t("expense.category.confirm.remove"))) {

            this.service.remove(category).subscribe(res => {
                this.flash.success(this.t.t("expense.category.flash.removed"));
            });
        }
    }

    onShowDeleted(e: Event, show: boolean = true) {
        e.preventDefault();
        this.show_deleted = show;
    }

    containsDeleted(): boolean {
        for (const category of this.categories) {
            if (category.deleted) return true;
        }
        return false;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}