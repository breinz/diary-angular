import { OnInit, Component, OnDestroy } from '@angular/core';
import { BreadcrumbService } from 'src/app/layout/breadcrumb/breadcrumb.service';
import { PeopleService } from '../people.service';
import { filter } from 'rxjs/operators';
import { People } from '../people.model';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/translation.service';

@Component({
    selector: "app-people-detail",
    templateUrl: "./people-detail.component.html"
})
export class PeopleDetailComponent implements OnInit, OnDestroy {

    public people: People;
    private sub: Subscription;

    constructor(
        private bc: BreadcrumbService,
        private service: PeopleService,
        public t: TranslationService
    ) {

    }

    ngOnInit() {
        this.sub = this.service.people.pipe(
            filter(res => res !== null)
        ).subscribe(people => {
            this.people = people;

            this.bc.build("people", people);
        });
    }

    public onDelete(e: Event) {
        e.preventDefault();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}