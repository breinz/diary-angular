import { Component, OnInit, ElementRef, Input, Renderer2 } from '@angular/core';

import ActionComponent from '../action-btn.abstract.component';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: '[edit-btn]',
  templateUrl: './edit-btn.component.html',
  styleUrls: ['./edit-btn.component.scss']
})
export class EditBtnComponent extends ActionComponent implements OnInit {

  @Input("edit-btn") text: string = null;
  @Input() title: string;

  @Input() br: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2, private t: TranslationService) {
    super(el, renderer);
    this.title = t.t("action.edit");
    this.klass = "btn-outline-info";
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
