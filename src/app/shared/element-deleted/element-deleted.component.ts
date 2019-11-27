import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';


@Component({
  selector: 'element-deleted',
  templateUrl: './element-deleted.component.html',
  styleUrls: ['./element-deleted.component.scss']
})
export class ElementDeletedComponent implements OnInit {

  @Output() recover = new EventEmitter();
  @Output() remove = new EventEmitter();

  constructor(
    public t: TranslationService
  ) { }

  ngOnInit() {
  }

  onRecover(e: Event) {
    e.preventDefault();
    this.recover.emit();
  }

  onRemove(e: Event) {
    e.preventDefault();
    this.remove.emit();
  }

}
