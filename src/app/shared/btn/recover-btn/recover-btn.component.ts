import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
import ActionComponent from '../action-btn.abstract.component';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: '[recover-btn]',
  templateUrl: './recover-btn.component.html',
  styleUrls: ['./recover-btn.component.scss']
})
export class RecoverBtnComponent extends ActionComponent {

  @Input("recover-btn") text: string = null;
  @Input() title: string;

  @Input() br: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2, private t: TranslationService) {
    super(el, renderer);
    this.title = t.t('action.recover');
    this.klass = "btn-outline-warning";
  }


}
