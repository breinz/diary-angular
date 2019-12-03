import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExpenseService, ExpenseReport, Report } from './expense.service';
import Expense from './expense.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FlashService } from '../shared/flash/flash.service';
import { TranslationService } from '../translation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../layout/breadcrumb/breadcrumb.service';

@Component({
	selector: 'app-expense',
	templateUrl: './expense.component.html',
	styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit, OnDestroy {

	public expenses: Expense[];
	public report: ExpenseReport;
	// public total: number;

	private report_sub: Subscription;
	private expense_sub: Subscription;
	private route_sub: Subscription;

	public year: string;
	public month: string;

	constructor(
		private service: ExpenseService,
		private sanitizer: DomSanitizer,
		private flash: FlashService,
		public t: TranslationService,
		private router: Router,
		private bc: BreadcrumbService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.route_sub = this.route.params.subscribe(params => {
			this.year = params.year || new Date().getFullYear();
			this.month = params.month || new Date().getMonth() + 1;

			this.service.month = this.month;
			this.service.year = this.year;

			this.service.getExpenses();
			this.service.getReport();
		});

		this.bc.build("expense");

		this.expense_sub = this.service.expenses.subscribe(res => {
			if (res) {
				this.expenses = res;
			}
		})

		this.report_sub = this.service.report.subscribe(res => {
			if (res) {
				this.report = res;
			}
		});

	}

	public onDelete(e: Event, expense: Expense) {
		e.preventDefault();

		if (confirm(this.t.t("expense.confirm.delete"))) {

			this.service.delete(expense).subscribe(res => {

				this.flash.success(this.t.t("expense.flash.deleted"));

				this.router.navigate(['/expense']);

			});
		}
	}

	getCurrentMonth() {
		let m = +this.month - 1;
		return this.t.t('date.month.' + m + '.long');
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
		return "/expense/" + y + "/" + this.zero(m);
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
		return "/expense/" + y + "/" + this.zero(m);
	}

	private zero(value: any): string {
		if (+value < 10) return "0" + value;
		return value;
	}

	getExpenseIconClass(expense: Expense): { [index: string]: boolean } {
		if (!expense.category) {
			return { 'fa-question': true };
		}

		let obj = {};

		obj["fa-" + expense.category.icon] = true;
		return obj;
	}

	getIcon(obj: { icon: string }): string {
		if (!obj || !obj.icon) {
			return "fa-euro-sign";
		}

		return "fa-" + obj.icon;
	}

	getCategoryBg(category) {
		let color = "#DDD";
		if (category) {

			color = category.color;
		}

		return this.sanitizer.bypassSecurityTrustStyle("padding-top:4px;padding-bottom:4px;background-color:" + color);
	}

	getStyleColor(attr: string, color: string) {
		return this.sanitizer.bypassSecurityTrustStyle(attr + ":" + color);
	}

	public getActiveReports() {
		let reports: Report[] = [];
		for (const r of this.report.reports) {
			if (r.report.value > 0) {
				reports.push(r);
			}
		}
		return reports;
	}

	ngOnDestroy() {
		this.report_sub.unsubscribe();
		this.expense_sub.unsubscribe();
		this.route_sub.unsubscribe();
	}

}
