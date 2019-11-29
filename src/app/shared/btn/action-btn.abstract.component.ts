import { OnInit, ElementRef, Input, Component, Renderer2 } from "@angular/core";

// @Component({
//     selector: "none"
// })
export default class ActionComponent implements OnInit {

    public title: string;

    protected klass: string = null;

    private _element: ElementRef;
    private _renderer: Renderer2;

    constructor(element: ElementRef, renderer: Renderer2) {
        this._element = element;
        this._renderer = renderer;
    }

    ngOnInit() {
        this._renderer.addClass(this._element.nativeElement, "btn");
        this._renderer.addClass(this._element.nativeElement, this.klass);
        this._renderer.addClass(this._element.nativeElement, "btn-sm");

        if (this.title) {
            this._renderer.setProperty(this._element.nativeElement, "title", this.title);
        }
    }
}