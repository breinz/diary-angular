import { OnInit, Component, OnDestroy } from '@angular/core';
import { BreadcrumbService } from 'src/app/layout/breadcrumb/breadcrumb.service';
import { PeopleService } from '../people.service';
import { filter } from 'rxjs/operators';
import { People } from '../people.model';
import { Subscription } from 'rxjs';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { Location } from '@angular/common';
import { TranslationService } from 'src/app/translation.service';

@Component({
    selector: "app-edit-people",
    templateUrl: "./edit-people.component.html"
})
export class EditPeopleComponent implements OnInit, OnDestroy {

    public people: People;
    private sub: Subscription;

    constructor(
        private bc: BreadcrumbService,
        private service: PeopleService,
        private flash: FlashService,
        private location: Location,
        private t: TranslationService
    ) {

    }

    ngOnInit() {
        this.sub = this.service.people.pipe(
            filter(res => res !== null)
        ).subscribe(people => {
            this.people = people;
            this.bc.build("people", people, "edit");
        })
    }

    public onSend(people: People) {
        this.service.patch(this.people._id, people).subscribe(res => {
            this.flash.success(this.t.t('people.flash.edited', this.people.firstName));
            this.location.back();
        });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}