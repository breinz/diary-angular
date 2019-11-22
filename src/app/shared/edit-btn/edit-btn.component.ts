import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: '[edit_btn]',
  templateUrl: './edit-btn.component.html',
  styleUrls: ['./edit-btn.component.scss']
})
export class EditBtnComponent implements OnInit {

  @Input("edit_btn") text: string = null;
  @Input() br: boolean = false;

  constructor(private ref: ElementRef) { }

  ngOnInit() {
    (<HTMLElement>this.ref.nativeElement).className = "btn btn-outline-primary btn-sm";
  }

}
