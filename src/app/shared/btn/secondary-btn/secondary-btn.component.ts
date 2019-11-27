import { Component, OnInit, ElementRef, Input } from '@angular/core';
import ActionComponent from '../action-btn.abstract.component';

@Component({
  selector: '[secondary-btn]',
  templateUrl: './secondary-btn.component.html',
  styleUrls: ['./secondary-btn.component.scss']
})
export class SecondaryBtnComponent extends ActionComponent implements OnInit {

  @Input("secondary-btn") text: string = null;
  @Input() icon: string = "fa-pen";

  @Input() br: boolean = true;

  constructor(private el: ElementRef) {
    super(el);
    this.klass = "btn-outline-secondary";
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getIcon() {
    const c: { [index: string]: boolean } = {};
    c[this.icon] = true;
    return c;
  }
}
