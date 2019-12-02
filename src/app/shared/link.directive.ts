import { Directive, Input, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[link]'
})
/**
 * Simulate a link with any element
 * - show the pointer
 * - listen to click, and navigate
 * 
 * @usage <td (link)="/where/to/go">...</td>
 */
export class LinkDirective implements OnInit {
  @Input("link") url: string;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  public ngOnInit() {
    // Cursor pointer
    this.renderer.setStyle(this.el.nativeElement, "cursor", "pointer");

    // Route
    this.renderer.listen(this.el.nativeElement, "click", () => {
      this.router.navigate([this.url], { relativeTo: this.activeRoute });
    });
  }

}
