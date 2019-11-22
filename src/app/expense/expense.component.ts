import { Component, OnInit } from '@angular/core';
import { ExpenseService } from './expense.service';
import Expense from './expense.model';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  public expenses: Expense[];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.expenseService.getExpenses().subscribe(res => {
      console.log(res);
      this.expenses = res.expenses;
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

}
