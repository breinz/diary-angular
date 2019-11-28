import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseComponent } from './expense/expense.component';
import { LoginComponent } from './user/login/login.component';
import { SigninComponent } from './user/signin/signin.component';
import { NewExpenseComponent } from './expense/new/new-expense.component';
import { EditExpenseComponent } from './expense/edit/edit-expense.component';
import { ExpenseCategoryComponent } from './expense/category/expense-category.component';
import { ExpenseCategoryDetailComponent } from './expense/category/detail/expense-category-detail.component';
import { NewExpenseCategoryComponent } from './expense/category/new/new-expense-category.component';
import { EditExpenseCategoryComponent } from './expense/category/edit/edit-expense-category.component';
import { LoginGuard } from './login-guard.service';
import { ExpenseExpenseComponent } from './expense/expense/expense-expense.component';
import { ExpenseGuard } from './expense/expense.guard';

const routes: Routes = [
  // Auth
  { path: "login", component: LoginComponent },
  { path: "signin", component: SigninComponent },

  // Expense categories
  { path: "expense/category", canActivate: [LoginGuard], component: ExpenseCategoryComponent },
  { path: "expense/category/new", canActivate: [LoginGuard], component: NewExpenseCategoryComponent },
  { path: "expense/category/:id", canActivate: [LoginGuard], component: ExpenseCategoryDetailComponent },
  { path: "expense/category/:id/edit", canActivate: [LoginGuard], component: EditExpenseCategoryComponent },

  // Expense
  { path: "expense", canActivate: [LoginGuard], component: ExpenseComponent },
  { path: "expense/new", canActivate: [LoginGuard], component: NewExpenseComponent },
  { path: "expense/:id", canActivate: [LoginGuard, ExpenseGuard], component: ExpenseExpenseComponent },
  { path: "expense/:id/edit", canActivate: [LoginGuard, ExpenseGuard], component: EditExpenseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
