import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ExpenseComponent } from './expense.component';
import { NewExpenseComponent } from './new/new-expense.component';
import { EditExpenseComponent } from './edit/edit-expense.component';
import { ExpenseExpenseComponent } from './expense/expense-expense.component';
import { ExpenseFormComponent } from './form/form.component';
import { ExpenseCategoryComponent } from './category/expense-category.component';
import { NewExpenseCategoryComponent } from './category/new/new-expense-category.component';
import { EditExpenseCategoryComponent } from './category/edit/edit-expense-category.component';
import { ExpenseCategoryDetailComponent } from './category/detail/expense-category-detail.component';
import { ExpenseCategoryForm } from './category/form/expense-category-form.component';
import { ExpenseRoutingModule } from './expense-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        // Expenses
        ExpenseComponent, NewExpenseComponent, EditExpenseComponent, ExpenseExpenseComponent, ExpenseFormComponent,

        // Expense Categories
        ExpenseCategoryComponent, NewExpenseCategoryComponent, EditExpenseCategoryComponent, ExpenseCategoryDetailComponent, ExpenseCategoryForm

    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        ExpenseRoutingModule,
    ]
})
export class ExpenseModule { }