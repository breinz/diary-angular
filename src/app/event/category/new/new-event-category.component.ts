import { OnInit, Component } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';
import EventCategory from '../eventCategory.model';
import { EventCategoryService } from '../event-category.service';
import { FlashService } from 'src/app/shared/flash/flash.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/layout/breadcrumb/breadcrumb.service';

@Component({
    selector: "app-new-event-category",
    templateUrl: "./new-event-category.component.html"
})
export class NewEventCategoryComponent implements OnInit {
    constructor(
        public t: TranslationService,
        private service: EventCategoryService,
        private flash: FlashService,
        private router: Router,
        private bc: BreadcrumbService
    ) {

    }

    ngOnInit() {
        this.bc.build("eventCategory", null, "new");
    }

    public onSend(category: EventCategory) {
        this.service.add(category).subscribe(res => {
            this.flash.success(this.t.t("event.category.flash.created"));
            this.router.navigate(["/event/category"]);
        });
    }
}