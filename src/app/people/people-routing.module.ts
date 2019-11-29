import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PeopleComponent } from './people.component';
import { NewPeopleComponent } from './new/new-people.component';
import { PeopleGuard } from './people.guard';

const routes: Routes = [
    { path: "", component: PeopleComponent },
    { path: 'deleted', component: PeopleComponent, canActivate: [PeopleGuard] },
    { path: "new", component: NewPeopleComponent },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PeopleRoutingModule {

}