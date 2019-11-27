import { Component, OnInit, ElementRef, Input } from '@angular/core';
import ActionComponent from '../action-btn.abstract.component';

@Component({
  selector: '[remove-btn]',
  templateUrl: './remove-btn.component.html',
  styleUrls: ['./remove-btn.component.scss']
})
export class RemoveBtnComponent extends ActionComponent {

  @Input("remove-btn") text: string = null;

  @Input() br: boolean = true;

  constructor(private el: ElementRef) {
    super(el);
    this.klass = "btn-danger"
  }


}
