import { OnInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/translation.service';
import { DiaryService } from '../diary.service';
import { People } from 'src/app/people/people.model';
import { BreadcrumbService } from 'src/app/layout/breadcrumb/breadcrumb.service';
import { Event as EventModel } from 'src/app/event/event.model';
import EventCategory from 'src/app/event/category/eventCategory.model';
import { DomSanitizer } from '@angular/platform-browser';
import Expense from 'src/app/expense/expense.model';
import { ExpenseCategory } from 'src/app/expense/category/expense-category.model';

@Component({
    selector: "app-diary-day",
    templateUrl: "./diary-day.component.html"
})
export class DiaryDayComponent implements OnInit, OnDestroy {

    public loading: boolean = true;

    private route_sub: Subscription;

    public year: string;
    public month: string;
    public day: string;

    public monthD: number;

    public people: People[];
    public events: EventModel[];
    public expenses: Expense[];

    constructor(
        private route: ActivatedRoute,
        public t: TranslationService,
        private service: DiaryService,
        private bc: BreadcrumbService,
        private sanitizer: DomSanitizer
    ) {

    }

    ngOnInit() {
        this.route_sub = this.route.params.subscribe(params => {

            this.loading = true;

            this.year = params.year;
            this.month = params.month;
            this.day = params.day;

            this.monthD = +this.month - 1;

            this.service.getDay(this.year, this.month, this.day).subscribe(res => {

                this.loading = false;

                this.people = res.people;
                this.events = res.events;
                this.expenses = res.expenses;
            });

            this.bc.build('diary', null, this.day + " " + this.t.t('date.month.' + this.monthD + '.long') + " " + this.year);
        });
    }

    public noData(): boolean {
        return (!this.expenses || this.expenses.length == 0)
            && (!this.events || this.events.length == 0)
            && (!this.people || this.people.length == 0);
    }

    public getEventIcon(event: EventModel) {
        if (event.category) {
            return (<EventCategory>event.category).icon;
        } else {
            return this.t.t("event.category.none.icon");
        }
    }

    public getEventIconColor(event: EventModel) {
        const category: EventCategory = event.category as EventCategory;
        let color = this.t.t("event.category.none.color");
        if (category) {
            color = category.color;
        }

        return this.sanitizer.bypassSecurityTrustStyle("color:" + color);
    }

    public getExpenseIcon(expense: Expense) {
        const category = expense.category as ExpenseCategory;
        if (category) {
            return category.icon;
        } else {
            return "euro-sign";
        }
    }

    public getExpenseIconColor(expense: Expense) {
        const category = expense.category as ExpenseCategory;
        let color = this.t.t("expense.category.none.color");
        if (category) {
            color = category.color;
        }
        return this.sanitizer.bypassSecurityTrustStyle("color:" + color);
    }

    ngOnDestroy() {
        this.route_sub.unsubscribe();
    }
}