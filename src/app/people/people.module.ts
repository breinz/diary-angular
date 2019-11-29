import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';
import { NewPeopleComponent } from './new/new-people.component';
import { PeopleFormComponent } from './form/people-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        PeopleComponent,
        NewPeopleComponent,
        PeopleFormComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PeopleRoutingModule,
        ReactiveFormsModule
    ]
})
export class PeopleModule { }