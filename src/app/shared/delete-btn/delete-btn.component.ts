import { Component, OnInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: '[delete_btn]',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.scss']
})
export class DeleteBtnComponent implements OnInit {

  @Input("delete_btn") text: string = null;
  @Input() br: boolean = false;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    (<HTMLElement>this.el.nativeElement).className = "btn btn-sm btn-outline-danger";
  }

}
