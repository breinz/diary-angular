import { OnInit, Component, OnDestroy } from '@angular/core';

import { TranslationService } from '../translation.service';
import { Event as EventModel } from './event.model';
import { EventService } from './event.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import EventCategory from './category/eventCategory.model';
import { DomSanitizer } from '@angular/platform-browser';
import { FlashService } from '../shared/flash/flash.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../layout/breadcrumb/breadcrumb.service';

@Component({
    selector: "app-event",
    templateUrl: "event.component.html"
})
export class EventComponent implements OnInit, OnDestroy {

    public loading: boolean = true;
    public empty = true;

    public events: EventModel[];

    private sub: Subscription;

    public show_deleted: boolean = false;

    constructor(
        public t: TranslationService,
        private service: EventService,
        private sanitizer: DomSanitizer,
        private flash: FlashService,
        private route: ActivatedRoute,
        private router: Router,
        private bc: BreadcrumbService
    ) {

    }

    ngOnInit() {
        this.bc.build('event');

        this.show_deleted = !!this.route.snapshot.url.length;

        this.sub = this.service.list.subscribe(list => {
            if (list === null) {
                this.loading = true;
                return;
            }
            this.loading = false;
            this.events = list;

            this.empty = this.events.length === 0;
        })
        this.service.getList();
    }

    public has_deleted(): boolean {
        if (!this.events) return false;

        for (const event of this.events) {
            if (event.deleted) return true
        }
        return false;
    }

    public getEvents() {
        let list = [];

        if (!this.events) return list;

        for (const event of this.events) {
            if (event.deleted === this.show_deleted) {
                list.push(event);
            }
        }
        return list;
    }

    public getIcon(event: EventModel) {
        if (event.category) {
            return (<EventCategory>event.category).icon;
        }
        return "ban";

    }

    public getIconColor(event: EventModel) {
        let color = this.t.t("event.category.none.color");
        if (event.category) {
            color = (<EventCategory>event.category).color;
        }

        return this.sanitizer.bypassSecurityTrustStyle("color:" + color);
    }

    public onDelete(e: Event, event: EventModel) {
        e.preventDefault();

        if (confirm(this.t.t('event.confirm.delete', event.title))) {
            this.service.delete(event).subscribe(res => {
                this.flash.success(this.t.t("event.flash.deleted", event.title));
            });
        }
    }

    public onRecover(e: Event, event: EventModel) {
        e.preventDefault();

        this.service.recover(event).subscribe(res => {
            this.flash.success(this.t.t("event.flash.recovered", event.title));
            this.router.navigate(['/event']);
        })
    }

    public onRemove(e: Event, event: EventModel) {
        e.preventDefault();

        if (confirm(this.t.t("event.confirm.remove", event.title))) {
            this.service.remove(event).subscribe(res => {
                this.flash.success(this.t.t("event.flash.removed", event.title));
                this.router.navigate(['/event']);
            })
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}