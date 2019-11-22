import { Directive, AfterContentInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class AutofocusDirective implements AfterContentInit {

  constructor(private el: ElementRef) { }

  ngAfterContentInit() {
    this.el.nativeElement.focus();
  }
}
