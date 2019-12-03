import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DiaryRoutingModule } from './diary-routing.module';
import { DiaryComponent } from './diary.component';

@NgModule({
    declarations: [
        DiaryComponent
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