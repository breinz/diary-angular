import { OnInit, Component, Input } from '@angular/core';

@Component({
    selector: "app-form-instruction",
    templateUrl: "./form-instruction.component.html"
})
export class FormInstructionComponent implements OnInit {
    @Input() text: string;
    @Input() html: string;

    constructor() {

    }

    ngOnInit() {

    }
}