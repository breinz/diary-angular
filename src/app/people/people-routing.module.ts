import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PeopleComponent } from './people.component';
import { NewPeopleComponent } from './new/new-people.component';
import { PeopleGuard } from './people.guard';
import { PeopleDetailComponent } from './detail/people-detail.component';
import { EditPeopleComponent } from './edit/edit-people.component';

const routes: Routes = [
    { path: "", component: PeopleComponent },
    { path: 'deleted', component: PeopleComponent, canActivate: [PeopleGuard] },
    { path: "new", component: NewPeopleComponent },
    { path: ":id", component: PeopleDetailComponent, canActivate: [PeopleGuard] },
    { path: ":id/edit", component: EditPeopleComponent, canActivate: [PeopleGuard] },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PeopleRoutingModule {

}