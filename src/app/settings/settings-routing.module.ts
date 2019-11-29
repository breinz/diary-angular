import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { CountryComponent } from './country/country.component';
import { NewCountryComponent } from './country/new/new-country.component';
import { EditCountryComponent } from './country/edit/edit-country.component';
import { CountryDetailComponent } from './country/detail/country-detail.component';
import { CountryGuard } from './country/country.guard';

const routes: Routes = [
    {
        path: "", component: SettingsComponent, children: [
            { path: "country", component: CountryComponent },
            { path: "country/new", component: NewCountryComponent },
            { path: "country/:id/edit", component: EditCountryComponent, canActivate: [CountryGuard] },
            { path: "country/:id", component: CountryDetailComponent, canActivate: [CountryGuard] }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class SettingsRoutingModule { }