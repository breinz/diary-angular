import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';
import { NewPeopleComponent } from './new/new-people.component';
import { PeopleFormComponent } from './form/people-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountrySharedModule } from '../settings/country/country-shared.module';
import { PeopleDetailComponent } from './detail/people-detail.component';
import { EditPeopleComponent } from './edit/edit-people.component';

@NgModule({
    declarations: [
        PeopleComponent,
        NewPeopleComponent,
        PeopleFormComponent,
        PeopleDetailComponent,
        EditPeopleComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PeopleRoutingModule,
        ReactiveFormsModule,
        CountrySharedModule
    ]
})
export class PeopleModule { }