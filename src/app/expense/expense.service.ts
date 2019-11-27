import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import Expense from './expense.model';
import Category from './category.model';

interface Report {
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

  constructor(private http: HttpClient) { }

  public getExpenses(period: string = "month", date?: Date) {
    return this.http.get<{ expenses: Expense[], report: ExpenseReport }>("/expense");
  }
}
