import { Component, OnInit, ElementRef, Input } from '@angular/core';
import ActionComponent from '../action-btn.abstract.component';

@Component({
  selector: '[new-btn]',
  templateUrl: './new-btn.component.html',
  styleUrls: ['./new-btn.component.scss']
})
export class NewBtnComponent extends ActionComponent implements OnInit {

  @Input("new-btn") text: string = null;

  @Input() br: boolean = true;

  constructor(
    private el: ElementRef
  ) {
    super(el);
    this.klass = "btn-outline-success";
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
