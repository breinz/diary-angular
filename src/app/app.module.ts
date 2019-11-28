import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Services
import { ApiInterceptorService } from './api-interceptor.service';
import { FlashService } from './shared/flash/flash.service';
import { TranslationService } from './translation.service';

// Pipes
import { FixedPipe } from './shared/fixed.pipe';
import { DeletedPipe } from './shared/deleted.pipe';

// Directives
import { LinkDirective } from './shared/link.directive';
import { AutofocusDirective } from './shared/autofocus.directive';

// Layout
import { AppHeaderComponent } from './app-header/app-header.component';
import { FooterComponent } from './footer/footer.component';

// Auth
import { LoginComponent } from './user/login/login.component';
import { SigninComponent } from './user/signin/signin.component';

// Expenses
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseExpenseComponent } from './expense/expense/expense-expense.component';
import { NewExpenseComponent } from "./expense/new/new-expense.component";
import { EditExpenseComponent } from './expense/edit/edit-expense.component';

// Expense Categories
import { ExpenseCategoryComponent } from "./expense/category/expense-category.component";
import { ExpenseCategoryDetailComponent } from './expense/category/detail/expense-category-detail.component';
import { NewExpenseCategoryComponent } from './expense/category/new/new-expense-category.component';
import { EditExpenseCategoryComponent } from './expense/category/edit/edit-expense-category.component';
import { ExpenseCategoryForm } from './expense/category/form/expense-category-form.component';

// Shared
import { FlashComponent } from './shared/flash/flash.component';
import { FormErrorComponent } from './shared/form/form-error/form-error.component';
import { FormInstructionComponent } from './shared/form/form-instruction/form-instruction.component';
import { FaIconComponent } from './shared/fa-icon/fa-icon.component';
import { ElementDeletedComponent } from './shared/element-deleted/element-deleted.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';

// Btn
import { EditBtnComponent } from './shared/btn/edit-btn/edit-btn.component';
import { DeleteBtnComponent } from './shared/btn/delete-btn/delete-btn.component';
import { NewBtnComponent } from './shared/btn/new-btn/new-btn.component';
import { SecondaryBtnComponent } from './shared/btn/secondary-btn/secondary-btn.component';
import { RecoverBtnComponent } from './shared/btn/recover-btn/recover-btn.component';
import { RemoveBtnComponent } from './shared/btn/remove-btn/remove-btn.component';
import { ExpenseFormComponent } from './expense/form/form.component';


export function translationInitializer(provider: TranslationService) {
  return () => provider.preload();
}

@NgModule({
  declarations: [
    AppComponent,

    // Layout
    AppHeaderComponent, FooterComponent,

    // Expenses
    ExpenseComponent, NewExpenseComponent, EditExpenseComponent, ExpenseExpenseComponent, ExpenseFormComponent,

    // Expense Categories
    ExpenseCategoryComponent, NewExpenseCategoryComponent, EditExpenseCategoryComponent, ExpenseCategoryDetailComponent, ExpenseCategoryForm,

    // Auth
    LoginComponent, SigninComponent,

    // Btn
    NewBtnComponent, EditBtnComponent, DeleteBtnComponent, RecoverBtnComponent, RemoveBtnComponent, SecondaryBtnComponent,

    // Pipes
    FixedPipe,
    DeletedPipe,

    // Directives
    LinkDirective,
    AutofocusDirective,

    // Shared
    FlashComponent,
    FaIconComponent,
    ElementDeletedComponent,
    SpinnerComponent,
    FormInstructionComponent,
    FormErrorComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    FlashService,
    TranslationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: translationInitializer,
      deps: [TranslationService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
