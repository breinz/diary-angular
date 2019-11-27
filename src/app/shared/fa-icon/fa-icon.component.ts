import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: '[fa-icon]',
  template: ''
})
export class FaIconComponent implements OnInit {

  @Input("fa-icon") icon: string;
  @Input() element: string = null;
  @Input() fw: boolean = false;

  constructor(
    private elRef: ElementRef
  ) { }

  ngOnInit() {
    const classList = (<HTMLElement>this.elRef.nativeElement).classList;
    classList.add("fa");
    if (this.fw) {
      classList.add("fa-fw");
    }
    classList.add(this.getIcon());
  }

  getIcon(): string {
    if (this.icon) {
      return "fa-" + this.icon;
    }
    return "fa-car-side";
  }

}
