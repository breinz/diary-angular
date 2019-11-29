import { Component, OnInit, ElementRef, Input, Renderer2 } from '@angular/core';
import ActionComponent from '../action-btn.abstract.component';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: '[new-btn]',
  templateUrl: './new-btn.component.html',
  styleUrls: ['./new-btn.component.scss']
})
export class NewBtnComponent extends ActionComponent implements OnInit {

  @Input("new-btn") text: string = null;
  @Input() title: string;

  @Input() br: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2, private t: TranslationService) {
    super(el, renderer);
    this.title = t.t('action.new');
    this.klass = "btn-outline-success";
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
