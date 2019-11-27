import { Component, OnInit, ElementRef, Input } from '@angular/core';

import ActionComponent from '../action-btn.abstract.component';

@Component({
  selector: '[edit-btn]',
  templateUrl: './edit-btn.component.html',
  styleUrls: ['./edit-btn.component.scss']
})
export class EditBtnComponent extends ActionComponent implements OnInit {

  @Input("edit-btn") text: string = null;

  @Input() br: boolean = true;

  constructor(private el: ElementRef) {
    super(el);
    this.klass = "btn-outline-info";
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
