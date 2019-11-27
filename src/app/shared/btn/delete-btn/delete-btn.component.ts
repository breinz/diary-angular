import { Component, OnInit, ElementRef, Input } from '@angular/core';
import ActionComponent from '../action-btn.abstract.component';

@Component({
  selector: '[delete-btn]',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.scss']
})
export class DeleteBtnComponent extends ActionComponent implements OnInit {

  @Input("delete-btn") text: string = null;

  @Input() br: boolean = true;

  constructor(private el: ElementRef) {
    super(el);
    this.klass = "btn-outline-danger";
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
