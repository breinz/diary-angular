import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { ExpenseComponent } from './expense/expense.component';
import { LoginComponent } from './user/login/login.component';
import { SigninComponent } from './user/signin/signin.component';
import { FooterComponent } from './footer/footer.component';
import { FormErrorComponent } from './shared/form-error/form-error.component';
import { ApiInterceptorService } from './shared/api-interceptor.service';
import { AutofocusDirective } from './shared/autofocus.directive';
import { EditBtnComponent } from './shared/edit-btn/edit-btn.component';
import { DeleteBtnComponent } from './shared/delete-btn/delete-btn.component';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    ExpenseComponent,
    LoginComponent,
    SigninComponent,
    FooterComponent,
    FormErrorComponent,
    AutofocusDirective,
    EditBtnComponent,
    DeleteBtnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
