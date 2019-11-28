import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import Expense from './expense.model';
import Category from './category.model';
import { BehaviorSubject } from 'rxjs';
import { LoadingStatusService } from '../loading-status.service';
import { tap } from 'rxjs/operators';

export interface Report {
	color: string;
	icon: string;
	report: {
		per: string,
		value: number
	}
}

export interface ExpenseReport {
	total: number;
	categories: {
		category: Category,
		total: number
	}[];
	reports: Report[]
}

@Injectable({
	providedIn: 'root'
})
export class ExpenseService {

	public expenses = new BehaviorSubject<Expense[]>(null);
	public report = new BehaviorSubject<ExpenseReport>(null);
	public expense = new BehaviorSubject<Expense>(null);

	constructor(
		private http: HttpClient,
		private loader: LoadingStatusService
	) {
		this.getExpenses();
		this.getReport();
	}

	public add(expense: Expense) {
		return this.http
			.post<{ ok: boolean }>("/expense/new", expense)
			.pipe(
				tap(res => {
					this.getExpenses();
					this.getReport();
				})
			);
	}

	public edit(id: string, data: Expense) {

		return this.http
			.patch<{ ok: boolean }>("/expense", data, { params: { id: id } })
			.pipe(
				tap(res => {
					this.getExpenses();
					this.getReport();
				})
			);
	}

	public delete(expense: Expense) {
		return this.http
			.delete("/expense", { params: { id: expense._id } })
			.pipe(
				tap(res => {
					this.getExpenses();
					this.getReport();
				})
			);
	}

	public getExpense(id: string) {
		return this.http
			.get<Expense>("/expense/expense", { params: { id } })
			.pipe(
				tap(res => {
					this.expense.next(res);
				})
			);
	}

	private getExpenses(period: string = "month", date?: Date) {
		this.loader.loaderStart();
		this.http
			.get<Expense[]>("/expense")
			.subscribe(res => {
				// setTimeout(() => {
				this.expenses.next(res);
				this.loader.loaderEnd();
				// }, 1500);
			});
	}

	private getReport(period: string = "month", date?: Date) {
		this.loader.loaderStart();
		this.http
			.get<ExpenseReport>("/expense/report")
			.subscribe(res => {
				// setTimeout(() => {
				this.report.next(res);
				this.loader.loaderEnd();
				// }, 3000);
			});
	}
}
