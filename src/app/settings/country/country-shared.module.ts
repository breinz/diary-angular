import { NgModule } from '@angular/core';

import { CountryForm } from './form/country-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        CountryForm
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        SharedModule
    ],
    exports: [
        CountryForm
    ]
})
export class CountrySharedModule { }