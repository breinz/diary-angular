import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: "root" })
export class LoadingStatusService {

    public loading = new BehaviorSubject<boolean>(false);

    private _status: number = 0;

    private get status(): number {
        return this._status;
    }

    private set status(value: number) {
        this._status = value;

        if (this.loading.value && this._status <= 0) {
            this.loading.next(false);
        } else if (!this.loading.value && this._status > 0) {
            this.loading.next(true);
        }
    }

    public loaderStart() {
        this.status = Math.max(this.status++, 1);
    }

    public loaderEnd() {
        this.status--;
    }

}