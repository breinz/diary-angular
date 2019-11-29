import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExpenseCategoryComponent } from './category/expense-category.component';
import { NewExpenseCategoryComponent } from './category/new/new-expense-category.component';
import { ExpenseCategoryDetailComponent } from './category/detail/expense-category-detail.component';
import { EditExpenseCategoryComponent } from './category/edit/edit-expense-category.component';
import { ExpenseComponent } from './expense.component';
import { NewExpenseComponent } from './new/new-expense.component';
import { ExpenseGuard } from './expense.guard';
import { ExpenseExpenseComponent } from './expense/expense-expense.component';
import { EditExpenseComponent } from './edit/edit-expense.component';

const routes: Routes = [
    // Expense categories
    { path: "category", component: ExpenseCategoryComponent },
    { path: "category/new", component: NewExpenseCategoryComponent },
    { path: "category/:id", component: ExpenseCategoryDetailComponent },
    { path: "category/:id/edit", component: EditExpenseCategoryComponent },

    // Expense
    { path: "", component: ExpenseComponent },
    { path: "new", component: NewExpenseComponent },
    { path: ":id", canActivate: [ExpenseGuard], component: ExpenseExpenseComponent },
    { path: ":id/edit", canActivate: [ExpenseGuard], component: EditExpenseComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExpenseRoutingModule { }