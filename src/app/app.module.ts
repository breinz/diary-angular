import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { ExpenseComponent } from './expense/expense.component';
import { NewExpenseComponent } from "./expense/new-expense/new-expense.component";
import { LoginComponent } from './user/login/login.component';
import { SigninComponent } from './user/signin/signin.component';
import { FooterComponent } from './footer/footer.component';
import { FormErrorComponent } from './shared/form/form-error/form-error.component';
import { ApiInterceptorService } from './shared/api-interceptor.service';
import { AutofocusDirective } from './shared/autofocus.directive';
import { EditBtnComponent } from './shared/btn/edit-btn/edit-btn.component';
import { DeleteBtnComponent } from './shared/btn/delete-btn/delete-btn.component';
import { FixedPipe } from './shared/fixed.pipe';
import { FlashComponent } from './shared/flash/flash.component';
import { NewBtnComponent } from './shared/btn/new-btn/new-btn.component';
import { FaIconComponent } from './shared/fa-icon/fa-icon.component';
import { SecondaryBtnComponent } from './shared/btn/secondary-btn/secondary-btn.component';
import { ExpenseCategoryComponent } from "./expense/category/expense-category.component";
import { NewExpenseCategoryComponent } from './expense/category/new/new-expense-category.component';
import { FormInstructionComponent } from './shared/form/form-instruction/form-instruction.component';
import { FlashService } from './shared/flash/flash.service';
import { TranslationService } from './translation.service';
import { EditExpenseCategoryComponent } from './expense/category/edit/edit-expense-category.component';
import { ExpenseCategoryForm } from './expense/category/form/expense-category-form.component';
import { LinkDirective } from './shared/link.directive';
import { ExpenseCategoryDetailComponent } from './expense/category/detail/expense-category-detail.component';
import { ElementDeletedComponent } from './shared/element-deleted/element-deleted.component';
import { RecoverBtnComponent } from './shared/btn/recover-btn/recover-btn.component';
import { RemoveBtnComponent } from './shared/btn/remove-btn/remove-btn.component';
import { DeletedPipe } from './shared/deleted.pipe';

export function translationInitializer(provider: TranslationService) {
  return () => provider.preload();
}

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    FormInstructionComponent,
    FormErrorComponent,
    ExpenseComponent,
    NewExpenseComponent,
    ExpenseCategoryComponent,
    NewExpenseCategoryComponent,
    EditExpenseCategoryComponent,
    ExpenseCategoryDetailComponent,
    ExpenseCategoryForm,
    LoginComponent,
    SigninComponent,
    FooterComponent,
    AutofocusDirective,
    EditBtnComponent,
    DeleteBtnComponent,
    FixedPipe,
    FlashComponent,
    NewBtnComponent,
    FaIconComponent,
    SecondaryBtnComponent,
    LinkDirective,
    ElementDeletedComponent,
    RecoverBtnComponent,
    RemoveBtnComponent,
    DeletedPipe
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
