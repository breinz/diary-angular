import { OnInit, Component } from '@angular/core';
import { EventService } from '../event.service';
import { TranslationService } from 'src/app/translation.service';
import EventCategory from '../category/eventCategory.model';
import { Event as EventModel } from '../event.model';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/layout/breadcrumb/breadcrumb.service';

@Component({
    selector: "app-event-detail",
    templateUrl: "./event-detail.component.html"
})
export class EventDetailComponent implements OnInit {

    public event: EventModel;
    public category: EventCategory;

    constructor(
        public es: EventService,
        public t: TranslationService,
        private flash: FlashService,
        private router: Router,
        private bc: BreadcrumbService
    ) {

    }

    ngOnInit() {
        this.event = this.es.event;
        this.category = this.es.event.category as EventCategory;

        this.bc.build('event', this.event);
    }

    onDelete(e: Event) {
        e.preventDefault();

        if (confirm(this.t.t('event.confirm.delete', this.event.title))) {
            this.es.delete(this.es.event).subscribe(res => {
                this.flash.success(this.t.t('event.flash.deleted', this.event.title));
                this.event.deleted = true;
            })
        }
    }

    onRecover() {
        this.es.recover(this.event).subscribe(res => {
            this.flash.success(this.t.t('event.flash.recovered', this.event.title));
            this.event.deleted = false;
        });
    }

    onRemove() {
        if (confirm(this.t.t('event.confirm.remove', this.event.title))) {
            this.es.remove(this.event).subscribe(res => {
                this.flash.success(this.t.t('event.flash.removed', this.event.title));
                this.router.navigate(["/event"]);
            })
        }
    }
}