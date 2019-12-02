import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

import { FlashService } from 'src/app/shared/flash/flash.service';
import { TranslationService } from 'src/app/translation.service';
import { ExpenseService } from '../expense.service';
import { LoadingStatusService } from 'src/app/loading-status.service';
import Expense from '../expense.model';

@Component({
  selector: 'app-expense-expense',
  templateUrl: './expense-expense.component.html',
  styleUrls: ['./expense-expense.component.scss']
})
export class ExpenseExpenseComponent implements OnInit {

  public expense: Expense;

  constructor(
    private service: ExpenseService,
    public t: TranslationService,
    private l: LoadingStatusService,
    private route: ActivatedRoute,
    private flash: FlashService,
    private router: Router,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    // @see ExpenseGuard
    this.expense = this.service.expense.value;
  }

  public onDelete(e: Event) {
    e.preventDefault();

    if (confirm(this.t.t("expense.confirm.delete"))) {

      // this.l.loaderStart();

      this.service.delete(this.expense).subscribe(res => {

        // this.l.loaderEnd();

        this.flash.success(this.t.t("expense.flash.deleted"));

        this.router.navigate(["/expense"]);
      });
    }
  }


}
