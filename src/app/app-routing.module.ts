import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './user/login/login.component';
import { SigninComponent } from './user/signin/signin.component';
import { LoginGuard } from './login-guard.service';

const routes: Routes = [
  // Auth
  { path: "login", component: LoginComponent },
  { path: "signin", component: SigninComponent },

  /*IF ANGULAR 8+ & TSCONFIG --module:esnext :
  () => import("./expense/expense.module").then(m => m.ModuleName)*/
  { path: "", pathMatch: "full", loadChildren: "./diary/diary.module#DiaryModule" },
  { path: "expense", loadChildren: "./expense/expense.module#ExpenseModule", canActivate: [LoginGuard] },
  { path: "people", loadChildren: "./people/people.module#PeopleModule", canActivate: [LoginGuard] },
  { path: "settings", loadChildren: "./settings/settings.module#SettingsModule", canActivate: [LoginGuard] },
  { path: "event", loadChildren: "./event/event.module#EventModule", canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
