import { OnInit, Component, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormService } from 'src/app/shared/form.service';
import { TranslationService } from 'src/app/translation.service';
import { EventCategoryService } from '../category/event-category.service';
import { filter, take } from 'rxjs/operators';
import EventCategory from '../category/eventCategory.model';
import { Subscription } from 'rxjs';
import { Event as EventModel } from '../event.model';

declare var $: any;

@Component({
    selector: "app-event-form",
    templateUrl: "./event-form.component.html",
    providers: [
        FormService
    ]
})
export class EventFormComponent implements OnInit, OnDestroy {

    @Input() event: EventModel;
    @Output() send = new EventEmitter<EventModel>();

    public form = new FormGroup({
        "title": new FormControl(null, Validators.required),
        "date": new FormControl(null, Validators.required),
        "category": new FormControl(null)
    });
    public categories: EventCategory[] = [];
    private eventCategorySub: Subscription;

    constructor(
        public fs: FormService,
        public t: TranslationService,
        private cs: EventCategoryService
    ) {
        fs.form = this.form;
        fs.element = "event";
    }

    ngOnInit() {
        this.eventCategorySub = this.cs.list.pipe(
            filter(list => list !== null),
        ).subscribe(list => {
            this.categories = list;
        });

        if (this.event) {
            this.form.setValue({
                "title": this.event.title,
                "date": new Date(this.event.date).toISOString().substr(0, 10),
                "category": this.event.category
            });
        } else {
            this.form.get("date").setValue(new Date().toISOString().substr(0, 10));
        }
    }

    public onSend() {
        this.send.emit(this.form.value);
    }

    public onEventCategoryModal(e: Event) {
        e.preventDefault();

        $("#newEventCategoryModal").modal();
    }

    public onAddEventCategory(eventCategory: EventCategory) {
        this.cs.add(eventCategory).subscribe(res => {
            $("#newEventCategoryModal").modal("hide");

            this.form.get("category").setValue(res.id);
        }
        );
    }

    ngOnDestroy() {
        this.eventCategorySub.unsubscribe();
    }
}