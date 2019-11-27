import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashService } from './flash.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss']
})
export class FlashComponent implements OnInit, OnDestroy {

  text: string = null;
  type: string = null;

  private sub: Subscription;

  constructor(
    private flashService: FlashService
  ) { }

  ngOnInit() {
    this.sub = this.flashService.text.subscribe(text => {
      this.text = text;
      this.type = this.flashService.type;
    })
  }

  getAlertClass(): string {
    switch (this.type) {
      case "success":
        return "alert-success";
      case "error":
        return "alert-danger";
      default:
        return "alert-secondary"
    }
  }

  dissmiss() {
    this.flashService.dissmiss();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
