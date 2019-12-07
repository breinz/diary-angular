import { OnInit, Component, OnDestroy } from '@angular/core';
import { BreadcrumbService } from '../layout/breadcrumb/breadcrumb.service';
import { TranslationService } from '../translation.service';
import { DiaryService } from './diary.service';
import Expense from '../expense/expense.model';
import { People } from '../people/people.model';
import { Event as EventModel } from '../event/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, empty } from 'rxjs';
import { FlashService } from '../shared/flash/flash.service';

@Component({
    selector: "app-diary",
    templateUrl: "./diary.component.html",
    styleUrls: ["./diary.component.scss"]
})
export class DiaryComponent implements OnInit, OnDestroy {

    public loading: boolean = true;
    public empty = false;
    public few = false;

    public year: string;
    public month: string;
    public monthD: number;

    public first: number;
    public last: number;

    public weeks: number[];
    public week = [0, 1, 2, 3, 4, 5, 6];

    public expenses: Expense[];
    public people: People[];
    public events: EventModel[];

    private route_sub: Subscription;

    private today: Date;


    constructor(
        private bc: BreadcrumbService,
        public t: TranslationService,
        private service: DiaryService,
        private route: ActivatedRoute,
        private router: Router,
        private flash: FlashService
    ) {

    }

    ngOnInit() {

        this.today = new Date();
        this.today.setHours(0, 0, 0, 0);
        this.today.setMinutes(this.today.getMinutes() - this.today.getTimezoneOffset());

        this.route_sub = this.route.params.subscribe(params => {

            this.loading = true;
            this.empty = false;
            this.few = false;

            this.year = params.year || new Date().getFullYear();
            this.month = params.month || new Date().getMonth() + 1;

            if (+this.month > 12 || +this.month < 1) {
                this.flash.error(this.t.t("global.error.request.invalid"));
                return this.router.navigate(["/"]);
            }

            // this.service.month = this.month;
            // this.service.year = this.year;

            // this.service.getExpenses();
            // this.service.getReport();
            this.monthD = +this.month - 1;

            this.service.getElements(this.year, this.month).subscribe(res => {

                this.loading = false;

                this.expenses = res.expenses;
                this.people = res.people;
                this.events = res.events;

                const total = this.expenses.length + this.people.length + this.events.length;
                if (total < 5) {
                    this.empty = total === 0;
                    this.few = !this.empty;
                }
            });

            this.countWeeks();

        });


        this.bc.build("diary");

        // TODO: Get year + month from route
        // this.year = "2019";
        // this.month = "12";

    }

    public onCellClick(w: number, d: number) {
        if (this.outOfMonth(w, d)) {
            return;
        }
        this.router.navigate(["/" + this.year + "/" + this.month + "/" + this.zero(this.getDayOfMonth(w, d))]);
    }

    public outOfMonth(w: number, d: number) {
        return this.first > this.cell(w, d) || this.getDayOfMonth(w, d) > this.last;
    }

    public getDayOfMonth(w: number, d: number): number {
        return this.cell(w, d) - this.first + 1;
    }

    public getDateOfMonth(w: number, d: number): Date {
        const dom = new Date(+this.year, +this.month - 1, this.getDayOfMonth(w, d));
        dom.setMinutes(dom.getMinutes() - dom.getTimezoneOffset());
        return dom;
    }

    public isToday(w: number, d: number): boolean {
        return this.getDateOfMonth(w, d).getTime() === this.today.getTime();
    }

    private cell(w: number, d: number): number {
        return w * 7 + d;
    }

    public getExpense(w: number, d: number): Expense {
        const dom = this.getDateOfMonth(w, d);

        if (!this.expenses) {
            return null;
        }

        return this.expenses.find(expense => {
            return new Date(expense.date).getTime() === dom.getTime();
        });
    }

    public getExpenseAmount(w: number, d: number): string {
        const expense = this.getExpense(w, d);

        if (!expense) return '';

        return expense.amount.toFixed(2) + " €";
    }

    public getEvents(w: number, d: number) {
        const dom = this.getDateOfMonth(w, d);

        let events = [];

        if (!this.events) {
            return events;
        }

        events = this.events.filter(event => {
            return new Date(event.date).getTime() === dom.getTime();
        })

        return events;
    }

    public getEventIcons(event: EventModel): string[] {
        if (event.categories.length == 0) {
            return ["calendar-alt"];
        }

        return event.categories.map(category => {
            return category.icon;
        })
    }

    public getEventName(event: EventModel): string {
        let plus = 0;
        if (event.total > event.categories.length) {
            plus = event.total - event.categories.length;
            if (event.categories.length == 0) plus--;
        }

        if (plus > 0) return "+" + plus;
        return "";
    }

    public hasPeople(w: number, d: number): boolean {
        const people = this.getPeople(w, d);
        return people && people.length > 0;
    }

    public getPeople(w: number, d: number): People[] {
        const dom = this.getDateOfMonth(w, d);

        if (!this.people) return null;

        return this.people.filter(people => {
            return new Date(people.date).getTime() === dom.getTime();
        });

    }

    public getPeopleName(w: number, d: number): string {
        const people = this.getPeople(w, d);

        if (!people) return "";

        const firstNames = <unknown>people[0].firstName as Array<string>;

        //let i = 0;
        let str = "";
        for (let i = 0; i < Math.min(2, firstNames.length); i++) {
            if (i > 0) str += ", ";
            str += firstNames[i];

        }

        if (firstNames.length > 2) {
            str += " +" + (firstNames.length - 2);
        }

        return str;

    }

    private countWeeks() {
        let firstD = new Date(+this.year, (+this.month) - 1);
        firstD.setDate(1);
        this.first = (firstD.getDay() || 7) - 1;

        let lastD = new Date(+this.year, (+this.month) - 1);
        lastD.setDate(1);
        lastD.setMonth(lastD.getMonth() + 1);
        lastD.setDate(lastD.getDate() - 1);
        this.last = lastD.getDate();

        const weekCount = Math.ceil((this.first + this.last) / 7);

        this.weeks = [];
        let i = 0;
        while (i < weekCount) {
            this.weeks.push(i++);
        }
    }

    private zero(value: any) {
        if (+value < 10) return "0" + value;
        return value;
    }

    ngOnDestroy() {
        this.route_sub.unsubscribe();
    }
}