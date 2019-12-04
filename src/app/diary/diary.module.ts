import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DiaryRoutingModule } from './diary-routing.module';
import { DiaryComponent } from './diary.component';
import { DiaryDayComponent } from './day/diary-day.component';

@NgModule({
    declarations: [
        DiaryComponent,
        DiaryDayComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        DiaryRoutingModule
        // PeopleRoutingModule,
        // ReactiveFormsModule,
        // CountrySharedModule
    ]
})
export class DiaryModule { }