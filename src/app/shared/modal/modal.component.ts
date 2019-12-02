import { OnInit, Component, Input } from '@angular/core';

@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html"
})
export class ModalComponent implements OnInit {
    @Input() title: string = "";
    @Input() modalId: string = "";

    constructor() {

    }

    ngOnInit() {

    }
}