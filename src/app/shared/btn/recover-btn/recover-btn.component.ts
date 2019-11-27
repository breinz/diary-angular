import { Component, OnInit, Input, ElementRef } from '@angular/core';
import ActionComponent from '../action-btn.abstract.component';

@Component({
  selector: '[recover-btn]',
  templateUrl: './recover-btn.component.html',
  styleUrls: ['./recover-btn.component.scss']
})
export class RecoverBtnComponent extends ActionComponent {

  @Input("recover-btn") text: string = null;

  @Input() br: boolean = true;

  constructor(private el: ElementRef) {
    super(el);
    this.klass = "btn-outline-warning";
  }


}
