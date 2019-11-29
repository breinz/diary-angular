import { Component, OnInit, ElementRef, Input, Renderer2 } from '@angular/core';
import ActionComponent from '../action-btn.abstract.component';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: '[remove-btn]',
  templateUrl: './remove-btn.component.html',
  styleUrls: ['./remove-btn.component.scss']
})
export class RemoveBtnComponent extends ActionComponent {

  @Input("remove-btn") text: string = null;
  @Input() title: string;

  @Input() br: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2, private t: TranslationService) {
    super(el, renderer);
    this.title = t.t("action.remove");
    this.klass = "btn-danger"
  }


}
