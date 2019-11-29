import { Injectable } from '@angular/core';
import { People } from './people.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { LoadingStatusService } from '../loading-status.service';
import { tap, take } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class PeopleService {

    public list = new BehaviorSubject<People[]>(null);

    constructor(
        private api: HttpClient,
        private loader: LoadingStatusService
    ) {
        this.getList();
    }


    public getList() {
        this.loader.loaderStart();
        return this.api.get<People[]>("/people").subscribe(res => {
            this.loader.loaderEnd();
            this.list.next(res);
        });
    }

    public add(people: People) {
        this.loader.loaderStart();
        return this.api.post("/people", people).pipe(
            tap(res => {
                this.loader.loaderEnd();
                this.getList();
            })
        );
    }

    public delete(people: People) {
        let patched = { ...people };
        patched.deleted = true;
        return this.patch(patched);
    }

    public recover(people: People) {
        let patched = { ...people };
        patched.deleted = false;
        return this.patch(patched);
    }

    private patch(people: People) {
        this.loader.loaderStart();
        return this.api.patch<{ ok: boolean }>('/people', people, {
            params: { id: people._id }
        }).pipe(
            tap(res => {
                this.loader.loaderEnd();
                this.getList();
            })
        );
    }
}