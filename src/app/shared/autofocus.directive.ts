import { Directive, AfterContentInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class AutofocusDirective implements AfterContentInit {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngAfterContentInit() {
    // No way to set focus with the renderer, I just assume this app will always run with a DOM
    this.el.nativeElement.focus();
  }
}
