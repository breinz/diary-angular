import { OnInit, Component, Input, ElementRef, Renderer2 } from '@angular/core';

type BsColors = "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "info" | "dark";

@Component({
    selector: "[bs-btn]",
    templateUrl: "./bs-btn.component.html"
})
export class BsBtnComponent implements OnInit {

    @Input("bs-btn") text: string;
    @Input() br: boolean = false;
    @Input() icon: string;
    @Input() size: "lg" | "sm" | "md" = "sm";
    @Input() color: BsColors = "primary";

    constructor(
        private element: ElementRef,
        private renderer: Renderer2
    ) {

    }

    ngOnInit() {
        if (this.icon && this.icon.substr(0, 2) !== "fa") {
            // this.icon = "fa-" + this.icon;
        }

        this.renderer.addClass(this.element.nativeElement, "btn");
        this.renderer.addClass(this.element.nativeElement, "btn-" + this.size);
        this.renderer.addClass(this.element.nativeElement, "btn-outline-" + this.color);
    }
}