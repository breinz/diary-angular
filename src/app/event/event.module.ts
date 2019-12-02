import { NgModule } from '@angular/core';
import { EventComponent } from './event.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EventRoutingModule } from './event-routing.module';
import { EventCategoryComponent } from './category/event-category.component';
import { NewEventCategoryComponent } from './category/new/new-event-category.component';
import { EventCategoryFormComponent } from './category/form/event-category-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditEventCategoryComponent } from './category/edit/edit-event-category.component';
import { EventCategoryDetailComponent } from './category/detail/event-category-detail.component';
import { NewEventComponent } from './new/new-event.component';
import { EventFormComponent } from './form/event-form.component';
import { EditEventComponent } from './edit/edit-event.component';
import { EventDetailComponent } from './detail/event-detail.component';

@NgModule({
    declarations: [
        EventComponent,
        NewEventComponent,
        EventFormComponent,
        EditEventComponent,
        EventDetailComponent,

        EventCategoryComponent,
        NewEventCategoryComponent,
        EventCategoryFormComponent,
        EditEventCategoryComponent,
        EventCategoryDetailComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        EventRoutingModule,
        ReactiveFormsModule
    ]
})
export class EventModule { }