import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpenseCategoryService } from '../category/expense-category.service';
import { ExpenseCategory } from '../category/expense-category.model';
import { map } from 'rxjs/operators';
import { TranslationService } from 'src/app/translation.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormService } from 'src/app/shared/form.service';
import { ExpenseService } from '../expense.service';
import { LoadingStatusService } from 'src/app/loading-status.service';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.scss']
})
export class NewExpenseComponent implements OnInit {

  public form = new FormGroup({
    "amount": new FormControl(null, [Validators.required, Validators.min(0)]),
    "date": new FormControl(new Date().toISOString().substr(0, 10), Validators.required),
    "description": new FormControl(null),
    "category": new FormControl(null)
  })

  public categories: ExpenseCategory[] = null;

  constructor(
    private service: ExpenseService,
    private catService: ExpenseCategoryService,
    public t: TranslationService,
    public sanitizer: DomSanitizer,
    public fs: FormService,
    private loader: LoadingStatusService,
    private flash: FlashService,
    private router: Router
  ) { }

  ngOnInit() {
    this.fs.form = this.form;
    this.fs.element = "expense";

    this.catService.list.pipe(
      map(res => {
        if (!res) {
          return;
        }

        let newList: ExpenseCategory[] = [];
        for (const category of res) {
          if (!category.deleted) {
            newList.push(category);
          }
        }
        return newList;
      })
    ).subscribe(res => {
      if (!res) {
        return;
      }
      this.categories = res;
      //this.form.get("category").setValue(this.categories[0]._id)
    });
  }

  public onSubmit() {
    this.loader.loaderStart();
    this.service.add(this.form.value).subscribe(res => {
      this.loader.loaderEnd();

      this.flash.success(this.t.t("expense.flash.created"));

      this.router.navigate(['/expense']);
    });
  }

  public onAddCategory(e: Event) {
    e.preventDefault();
  }

}