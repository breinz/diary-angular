import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiInterceptorService } from './api-interceptor.service';
import { TranslationService } from './translation.service';
import { AppHeaderComponent } from './app-header/app-header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './user/login/login.component';
import { SigninComponent } from './user/signin/signin.component';
import { FlashComponent } from './shared/flash/flash.component';
import { SharedModule } from './shared/shared.module';
import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';


export function translationInitializer(provider: TranslationService) {
  return () => provider.preload();
}

@NgModule({
  declarations: [
    AppComponent,

    // Layout
    AppHeaderComponent, FooterComponent,
    FlashComponent,
    BreadcrumbComponent,

    // Auth
    LoginComponent, SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
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
