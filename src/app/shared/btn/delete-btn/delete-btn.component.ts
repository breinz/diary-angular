import { Component, OnInit, ElementRef, Input, Renderer2 } from '@angular/core';
import ActionComponent from '../action-btn.abstract.component';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: '[delete-btn]',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.scss']
})
export class DeleteBtnComponent extends ActionComponent implements OnInit {

  @Input("delete-btn") text: string = null;
  @Input() title: string;

  @Input() br: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2, private t: TranslationService) {
    super(el, renderer);
    this.title = t.t("action.delete");
    this.klass = "btn-outline-danger";
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
