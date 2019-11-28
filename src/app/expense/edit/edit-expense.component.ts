import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';
import Expense from '../expense.model';
import { ExpenseService } from '../expense.service';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss']
})
export class EditExpenseComponent implements OnInit {

  public expense: Expense;

  constructor(
    private service: ExpenseService,
    public t: TranslationService,
    private flash: FlashService,
    private location: Location
  ) { }

  ngOnInit() {
    this.expense = this.service.expense.value;
  }

  onSubmit(data: Expense) {

    this.service.edit(this.expense._id, data).subscribe(res => {
      this.flash.success(this.t.t('expense.flash.edited'));
      this.location.back();
    });
  }

}
