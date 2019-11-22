import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpenseComponent } from './expense/expense.component';
import { LoginComponent } from './user/login/login.component';
import { SigninComponent } from './user/signin/signin.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signin", component: SigninComponent },
  { path: "expense", component: ExpenseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
