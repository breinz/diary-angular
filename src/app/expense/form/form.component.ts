import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';
import Expense from '../expense.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormService } from 'src/app/shared/form.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ExpenseCategory } from '../category/expense-category.model';
import { ExpenseCategoryService } from '../category/expense-category.service';

@Component({
  selector: 'expense-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    FormService
  ]
})
export class ExpenseFormComponent implements OnInit {

  @Input() values: Expense;
  @Output() send = new EventEmitter<Expense>();

  public categories: ExpenseCategory[];

  public form = new FormGroup({
    "amount": new FormControl(null, [Validators.required, Validators.min(0)]),
    "date": new FormControl(null, Validators.required),
    "description": new FormControl(null),
    "category": new FormControl(null)
  });

  constructor(
    public t: TranslationService,
    public f: FormService,
    public sanitizer: DomSanitizer,
    private catService: ExpenseCategoryService
  ) { }

  ngOnInit() {
    this.f.form = this.form;
    this.f.element = "expense";

    this.catService.list.subscribe(list => {
      this.categories = list;
    });

    if (this.values) {

      this.form.setValue({
        amount: this.values.amount,
        date: new Date(this.values.date).toISOString().substr(0, 10),
        description: this.values.description,
        category: this.values.category ? this.values.category._id : null
      })
    }
  }

  public onSubmit() {
    this.send.emit(this.form.value);
  }

  onAddCategory(e: Event) {
    e.preventDefault();

    alert("To be implemented");

  }

}
