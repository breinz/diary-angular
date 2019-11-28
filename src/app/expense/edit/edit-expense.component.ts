import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.scss']
})
export class EditExpenseComponent implements OnInit {

  constructor(
    private t: TranslationService
  ) { }

  ngOnInit() {
  }

}
