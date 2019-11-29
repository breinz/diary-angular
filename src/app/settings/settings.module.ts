import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { CountryComponent } from './country/country.component';
import { NewCountryComponent } from './country/new/new-country.component';
import { CountryForm } from './country/form/country-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditCountryComponent } from './country/edit/edit-country.component';
import { CountryDetailComponent } from './country/detail/country-detail.component';

@NgModule({
    declarations: [
        SettingsComponent,
        CountryComponent,
        NewCountryComponent,
        EditCountryComponent,
        CountryForm,
        CountryDetailComponent
    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class SettingsModule { }