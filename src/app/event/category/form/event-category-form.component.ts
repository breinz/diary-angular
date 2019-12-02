import { OnInit, Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormService } from 'src/app/shared/form.service';
import { TranslationService } from 'src/app/translation.service';
import EventCategory from '../eventCategory.model';

@Component({
    selector: "app-event-category-form",
    templateUrl: "./event-category-form.component.html",
    providers: [
        FormService
    ]
})
export class EventCategoryFormComponent implements OnInit {

    @Input() category: EventCategory;
    @Output() send = new EventEmitter<EventCategory>();

    public form = new FormGroup({
        "name": new FormControl(null, Validators.required),
        "icon": new FormControl(null, Validators.required),
        "color": new FormControl(null, Validators.required)
    });

    constructor(
        public formService: FormService,
        public t: TranslationService
    ) {
        formService.form = this.form;
        formService.element = "eventCategory";
    }

    ngOnInit() {
        if (this.category) {
            this.form.setValue({
                name: this.category.name,
                icon: this.category.icon,
                color: this.category.color
            });
        }
    }

    onSend() {
        if (this.form.invalid) {
            return;
        }
        this.send.emit(this.form.value);
    }
}