import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { CountryComponent } from './country/country.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditCountryComponent } from './country/edit/edit-country.component';
import { CountryDetailComponent } from './country/detail/country-detail.component';
import { CountrySharedModule } from './country/country-shared.module';
import { NewCountryComponent } from './country/new/new-country.component';

@NgModule({
    declarations: [
        SettingsComponent,
        CountryComponent,
        NewCountryComponent,
        EditCountryComponent,
        CountryDetailComponent
    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        SharedModule,
        //ReactiveFormsModule,
        CountrySharedModule
    ]
})
export class SettingsModule { }