import { Component, OnInit } from '@angular/core';
import { ExpenseService, ExpenseReport } from './expense.service';
import Expense from './expense.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  public expenses: Expense[];
  public report: ExpenseReport;
  public total: number;

  constructor(
    private expenseService: ExpenseService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.expenseService.getExpenses().subscribe(res => {
      this.expenses = res.expenses;
      this.report = res.report;
      this.total = this.report.total;
    });
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

}
