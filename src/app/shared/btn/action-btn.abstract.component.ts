import { OnInit, ElementRef, Input, Component } from "@angular/core";

// @Component({
//     selector: "none"
// })
export default class ActionComponent implements OnInit {

    //@Input() public br: boolean = true;

    protected klass: string = null;

    constructor(private ref: ElementRef) { }

    ngOnInit() {
        const classList = (<HTMLElement>this.ref.nativeElement).classList;
        classList.add("btn");
        classList.add(this.klass);
        classList.add("btn-sm");
    }
}