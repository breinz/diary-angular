import { OnInit, Component } from '@angular/core';
import { BreadcrumbService } from '../layout/breadcrumb/breadcrumb.service';
import { TranslationService } from '../translation.service';

@Component({
    selector: "app-diary",
    templateUrl: "./diary.component.html",
    styleUrls: ["./diary.component.scss"]
})
export class DiaryComponent implements OnInit {

    private year: string;
    private month: string;

    public first: number;
    public last: number;

    public weeks: number[];
    public week = [0, 1, 2, 3, 4, 5, 6];

    constructor(
        private bc: BreadcrumbService,
        public t: TranslationService
    ) {

    }

    ngOnInit() {
        this.bc.build("diary");

        // TODO: Get year + month from route
        this.year = "2019";
        this.month = "12";

        this.countWeeks();
    }

    public outOfMonth(w: number, d: number) {
        return this.first > this.cell(w, d) || this.getDayOfMonth(w, d) > this.last;
    }

    public getDayOfMonth(w: number, d: number) {
        return this.cell(w, d) - this.first + 1;
    }

    public isToday(w: number, d: number) {
        return this.getDayOfMonth(w, d) === new Date().getDate();
    }

    private cell(w: number, d: number) {
        return w * 7 + d;
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
}