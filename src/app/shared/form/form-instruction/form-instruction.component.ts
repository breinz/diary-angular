import { Component, Input } from '@angular/core';

@Component({
    selector: "form-instruction",
    templateUrl: "./form-instruction.component.html"
})
export class FormInstructionComponent {
    @Input("form-instruction") text: string
}