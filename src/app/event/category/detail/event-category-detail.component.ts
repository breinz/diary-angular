import { OnInit, Component } from '@angular/core';
import { EventCategoryService } from '../event-category.service';
import { take } from 'rxjs/operators';
import EventCategory from '../eventCategory.model';
import { TranslationService } from 'src/app/translation.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { Router } from '@angular/router';
import { Event as EventModel } from '../../event.model';

@Component({
    selector: "event-category-detail",
    templateUrl: "./event-category-detail.component.html"
})
export class EventCategoryDetailComponent implements OnInit {

    public category: EventCategory;
    public events: EventModel[];

    constructor(
        private service: EventCategoryService,
        public t: TranslationService,
        private sanitizer: DomSanitizer,
        private flash: FlashService,
        private router: Router
    ) {

    }

    ngOnInit() {
        this.service.category.pipe(
            take(1)
        ).subscribe(category => {
            this.category = category;
            this.events = category.events.filter(event => {
                return !event.deleted;
            })
        })
    }

    onDelete(e: Event) {
        e.preventDefault();

        if (confirm(this.t.t('event.category.confirm.delete', this.category.name))) {
            this.service.delete(this.category).subscribe(res => {
                this.flash.success(this.t.t("event.category.flash.deleted", this.category.name));
                this.router.navigate(['/event/category']);
            })
        }
    }

    getIconColor() {
        return this.sanitizer.bypassSecurityTrustStyle("color:" + this.category.color);
    }
}