import { OnInit, Component, Input } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';

@Component({
    selector: "app-month-navigation",
    templateUrl: "./month-navigation.component.html"
})
export class MonthNavigationComponent implements OnInit {

    @Input() month: number;
    @Input() year: number;
    @Input() base: string = "";

    constructor(
        private t: TranslationService
    ) {

    }

    ngOnInit() {

    }

    getPrevMonth() {
        let y = "";
        let m = +this.month - 2;
        if (m === -1) {
            m = 11;
            y = " " + (+this.year - 1);
        }
        return this.t.t('date.month.' + m + '.long') + y;
    }

    getPrevLink() {
        let y = +this.year;
        let m = +this.month - 1;
        if (m === 0) {
            m = 12;
            y--;
        }
        return this.base + "/" + y + "/" + this.zero(m);
    }

    getNextMonth() {
        let y = "";
        let m = +this.month;
        if (m === 12) {
            m = 0;
            y = " " + (+this.year + 1);
        }
        return this.t.t('date.month.' + m + '.long') + y;
    }

    getNextLink() {
        let y = +this.year;
        let m = +this.month + 1;
        if (m === 13) {
            m = 1;
            y++;
        }
        return this.base + "/" + y + "/" + this.zero(m);
    }

    private zero(value: any): string {
        if (+value < 10) return "0" + value;
        return value;
    }
}