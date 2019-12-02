import { OnInit, Component, OnDestroy } from '@angular/core';

import { TranslationService } from 'src/app/translation.service';
import { EventCategoryService } from './event-category.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import EventCategory from './eventCategory.model';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BreadcrumbService } from 'src/app/layout/breadcrumb/breadcrumb.service';

@Component({
    selector: "app-event-category",
    templateUrl: "./event-category.component.html"
})
export class EventCategoryComponent implements OnInit, OnDestroy {

    public list: EventCategory[];
    private sub: Subscription;

    constructor(
        public t: TranslationService,
        public service: EventCategoryService,
        private flash: FlashService,
        private sanitizer: DomSanitizer,
        private bc: BreadcrumbService
    ) {

    }

    ngOnInit() {
        this.bc.build("eventCategory");

        this.sub = this.service.list.pipe(
            filter(list => list !== null)
        ).subscribe(list => {
            this.list = list;
        });

        this.service.getList();
    }

    public onDelete(e: Event, category: EventCategory) {
        e.preventDefault();

        if (confirm(this.t.t('event.category.confirm.delete', category.name))) {
            this.service.delete(category).subscribe(res => {
                this.flash.success(this.t.t("event.category.flash.deleted", category.name));
            })
        }
    }

    public getIconColor(category: EventCategory) {
        return this.sanitizer.bypassSecurityTrustStyle('color:' + category.color);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}