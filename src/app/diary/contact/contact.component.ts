import { OnInit, Component } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormService } from 'src/app/shared/form.service';
import { DiaryService } from '../diary.service';
import { FlashService } from 'src/app/shared/flash/flash.service';

@Component({
    selector: "app-contact",
    templateUrl: "./contact.component.html",
    providers: [FormService]
})
export class ContactComponent implements OnInit {

    public form = new FormGroup({
        "reason": new FormControl(null),
        "email": new FormControl(null, [Validators.required, Validators.email]),
        "name": new FormControl(null),
        "company": new FormControl(null),
        "city": new FormControl(null),
        "message": new FormControl(null, Validators.required)
    });

    constructor(
        public t: TranslationService,
        public fs: FormService,
        private service: DiaryService,
        private flash: FlashService
    ) {

    }

    ngOnInit() {

        this.fs.form = this.form;
        this.fs.element = "contact";

    }

    public onSend() {
        if (this.form.invalid) {
            return;
        }

        this.service.sendContact(this.form.value).subscribe(res => {
            this.flash.success("Message sent!");
            this.form.reset({
                "reason": null,
                "email": null,
                "name": null,
                "company": null,
                "city": null,
                "message": null
            });
        })

    }
}