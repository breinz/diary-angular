import { Component, Input } from '@angular/core';

@Component({
    selector: "form-instruction",
    templateUrl: "./old-form-instruction.component.html"
})
export class OldFormInstructionComponent {
    @Input("form-instruction") text: string;
}