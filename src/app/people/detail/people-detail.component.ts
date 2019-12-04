import { OnInit, Component, OnDestroy } from '@angular/core';
import { BreadcrumbService } from 'src/app/layout/breadcrumb/breadcrumb.service';
import { PeopleService } from '../people.service';
import { filter } from 'rxjs/operators';
import { People } from '../people.model';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/translation.service';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { Router } from '@angular/router';

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
        public t: TranslationService,
        private flash: FlashService,
        private router: Router
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

        if (confirm(this.t.t("people.confirm.delete"))) {
            this.service.delete(this.people).subscribe(res => {
                this.flash.success(this.t.t("people.flash.deleted"));
                this.people.deleted = true;
            });
        }
    }

    public onRecover() {
        this.service.recover(this.people).subscribe(res => {
            this.flash.success(this.t.t("people.flash.recovered"));
            this.people.deleted = false;
        });
    }

    public onRemove() {
        if (confirm(this.t.t('people.confirm.remove', this.people.firstName + " " + this.people.lastName))) {
            this.service.remove(this.people).subscribe(res => {
                this.flash.success(this.t.t("people.flash.removed", this.people.firstName + " " + this.people.lastName));
                this.router.navigate(["/people"]);
            });
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}