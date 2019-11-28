import { Component, OnInit, Sanitizer, OnDestroy } from '@angular/core';
import { ExpenseCategoryService } from './expense-category.service';
import { ExpenseCategory } from './expense-category.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/translation.service';
import { LoadingStatusService } from 'src/app/loading-status.service';

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
        public t: TranslationService,
        private loader: LoadingStatusService
    ) {

    }

    public ngOnInit() {
        this.sub = this.service.list.subscribe(list => {
            if (!list) return;
            this.categories = list;
        })
    }

    public onEdit(category: ExpenseCategory, event: Event) {
        event.preventDefault();

        this.router.navigate(["/expense/category/" + category._id + "/edit"]);
    }

    public onDelete(category: ExpenseCategory, event: Event) {
        event.preventDefault();

        if (confirm(this.t.t("expense.category.confirm.delete"))) {
            this.loader.loaderStart();

            this.service.delete(category).subscribe(
                res => {
                    this.loader.loaderEnd();
                    this.flash.success(this.t.t("expense.category.flash.deleted"));
                },
                err => {
                    this.loader.loaderEnd();
                    this.flash.error(this.t.t("expense.category.flash.not_found"));
                });
        }
    }

    public onRecover(category: ExpenseCategory, event: Event) {
        event.preventDefault();

        this.loader.loaderStart();

        this.service.recover(category).subscribe(res => {
            this.loader.loaderEnd();
            this.flash.success(this.t.t("expense.category.flash.recovered"));
        });

    }

    public onRemove(category: ExpenseCategory, event: Event) {
        event.preventDefault();

        if (confirm(this.t.t("expense.category.confirm.remove"))) {

            this.loader.loaderStart();
            this.service.remove(category).subscribe(res => {
                this.loader.loaderEnd();
                this.flash.success(this.t.t("expense.category.flash.removed"));
            });
        }
    }

    /**
     * Get the UNsanitized value for a style
     * @param attr 
     * @param color 
     */
    public getIconColor(attr: string, color: string) {
        let s = attr + ":";
        return this.sanitizer.bypassSecurityTrustStyle(s + color);
    }

    /**
     * Toggle deleted / active
     * @param e 
     * @param show 
     */
    public onShowDeleted(e: Event, show: boolean = true) {
        e.preventDefault();
        this.show_deleted = show;
    }

    /**
     * Does the list has any deleted item
     */
    public containsDeleted(): boolean {
        for (const category of this.categories) {
            if (category.deleted) return true;
        }
        return false;
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

}