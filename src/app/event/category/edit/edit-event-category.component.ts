import { OnInit, Component } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';
import EventCategory from '../eventCategory.model';
import { EventCategoryService } from '../event-category.service';
import { take } from 'rxjs/operators';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { Location } from '@angular/common';
import { BreadcrumbService } from 'src/app/layout/breadcrumb/breadcrumb.service';

@Component({
    selector: "edit-event-category",
    templateUrl: "./edit-event-category.component.html"
})
export class EditEventCategoryComponent implements OnInit {

    public category: EventCategory;

    constructor(
        public t: TranslationService,
        private service: EventCategoryService,
        private flash: FlashService,
        private location: Location,
        private bc: BreadcrumbService
    ) {

    }

    ngOnInit() {
        this.service.category.pipe(
            take(1)
        ).subscribe(category => {
            this.category = category;

            this.bc.build("eventCategory", category, "edit");
        });

    }

    public onSend(category: EventCategory) {
        this.service.patch(this.category._id, category).subscribe(res => {
            this.flash.success(this.t.t('event.category.flash.edited', category.name));
            this.location.back();
        });
    }
}