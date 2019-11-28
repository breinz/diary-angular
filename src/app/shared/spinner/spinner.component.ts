import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor(public t: TranslationService) { }

  ngOnInit() {
  }

}
