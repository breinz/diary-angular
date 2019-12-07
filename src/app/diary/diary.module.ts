import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DiaryRoutingModule } from './diary-routing.module';
import { DiaryComponent } from './diary.component';
import { DiaryDayComponent } from './day/diary-day.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        HomeComponent,
        DiaryComponent,
        DiaryDayComponent,
        ContactComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        DiaryRoutingModule
        // PeopleRoutingModule,
        // ReactiveFormsModule,
        // CountrySharedModule
    ]
})
export class DiaryModule { }