import { OnInit, Component } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';
import { Event as EventModel } from '../event.model';
import { EventService } from '../event.service';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { Location } from '@angular/common';
import { BreadcrumbService } from 'src/app/layout/breadcrumb/breadcrumb.service';

@Component({
    selector: "app-edit-event",
    templateUrl: "./edit-event.component.html"
})
export class EditEventComponent implements OnInit {
    constructor(
        public t: TranslationService,
        public es: EventService,
        private flash: FlashService,
        private location: Location,
        private bc: BreadcrumbService
    ) {

    }

    ngOnInit() {
        this.bc.build("event", this.es.event, "edit");
    }

    public onSend(event: EventModel) {
        this.es.patch(this.es.event._id, event).subscribe(res => {
            this.flash.success(this.t.t('event.flash.edited', event.title));
            this.location.back();
        })
    }
}