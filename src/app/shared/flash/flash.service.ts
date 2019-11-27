//import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

//@Injectable({ providedIn: 'root' })
export class FlashService {

  static DEFAULT_DURATION: number = 2500;

  text = new Subject<string>();
  type: string = null;

  private timer: any;

  error(text: string, duration: number = FlashService.DEFAULT_DURATION) {
    this.flash("error", text, duration);
  }

  success(text: string, duration: number = FlashService.DEFAULT_DURATION) {
    this.flash("success", text, duration);
  }

  dissmiss() {
    this._dissmiss();
  }

  private flash(type: string, text: string, duration: number) {
    this.type = type;
    this.text.next(text);

    this.setTimer(duration);
  }

  private setTimer(duration: number) {
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this._dissmiss();
    }, duration);
  }

  private _dissmiss() {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.text.next(null);
    this.timer = null;
  }
}
