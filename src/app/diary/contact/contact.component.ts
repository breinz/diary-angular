import { OnInit, Component } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormService } from 'src/app/shared/form.service';

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
        public fs: FormService
    ) {

    }

    ngOnInit() {

        this.fs.form = this.form;
        this.fs.element = "contact";

    }
}