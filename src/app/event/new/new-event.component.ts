import { OnInit, Component } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';
import { Event as EventModel } from '../event.model';
import { EventService } from '../event.service';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { Router } from '@angular/router';

@Component({
    selector: "app-new-event",
    templateUrl: "./new-event.component.html"
})
export class NewEventComponent implements OnInit {

    constructor(
        public t: TranslationService,
        private es: EventService,
        private flash: FlashService,
        private router: Router
    ) {

    }

    ngOnInit() {

    }

    public onSend(event: EventModel) {
        this.es.add(event).subscribe(res => {
            this.flash.success(this.t.t('event.flash.created', event.title));
            this.router.navigate(['/event']);
        })
    }
}