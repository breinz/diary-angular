import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './event.component';
import { EventCategoryComponent } from './category/event-category.component';
import { NewEventCategoryComponent } from './category/new/new-event-category.component';
import { EditEventCategoryComponent } from './category/edit/edit-event-category.component';
import { EventCategoryGuard } from './category/event-category.guard';
import { EventCategoryDetailComponent } from './category/detail/event-category-detail.component';
import { NewEventComponent } from './new/new-event.component';
import { EditEventComponent } from './edit/edit-event.component';
import { EventGuard } from './event.guard';
import { EventDetailComponent } from './detail/event-detail.component';

const routes: Routes = [
    { path: "", component: EventComponent },

    { path: "category", component: EventCategoryComponent },
    { path: "category/new", component: NewEventCategoryComponent },
    { path: "category/:id/edit", component: EditEventCategoryComponent, canActivate: [EventCategoryGuard] },
    { path: "category/:id", component: EventCategoryDetailComponent, canActivate: [EventCategoryGuard] },

    { path: "deleted", component: EventComponent },
    { path: "new", component: NewEventComponent },
    { path: ":id/edit", component: EditEventComponent, canActivate: [EventGuard] },
    { path: ":id", component: EventDetailComponent, canActivate: [EventGuard] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class EventRoutingModule {

}