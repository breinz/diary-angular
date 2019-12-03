import { Injectable } from '@angular/core';
import { People } from './people.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class PeopleService {

    public list = new BehaviorSubject<People[]>(null);
    public people = new BehaviorSubject<People>(null);

    constructor(
        private api: HttpClient
    ) {
        // this.getList();
    }


    public getList() {
        return this.api.get<People[]>("/people").subscribe(res => {
            this.list.next(res);
        });
    }

    public getPeople(id: string) {
        return this.api.get<People>("/people/people", { params: { id } })
            .pipe(
                tap(res => {
                    this.people.next(res);
                })
            );
    }

    public add(people: People) {
        return this.api.post("/people", people).pipe(
            tap(res => {
                this.getList();
            })
        );
    }

    public patch(id: string, values: People) {
        return this.api
            .patch<{}>("/people", values, { params: { id } })
            .pipe(
                tap(res => {
                    this.getList()
                })
            );
    }

    public delete(people: People) {
        let patched = { ...people };
        patched.deleted = true;
        return this.patch(patched._id, patched);
    }

    public recover(people: People) {
        let patched = { ...people };
        patched.deleted = false;
        return this.patch(patched._id, patched);
    }

    public remove(people: People) {
        return this.api.delete<{}>("/people", { params: { id: people._id } })
            .pipe(
                tap(res => {
                    this.getList();
                })
            );
    }

    /*private patch(people: People) {
        return this.api.patch<{ ok: boolean }>('/people', people, {
            params: { id: people._id }
        }).pipe(
            tap(res => {
                this.getList();
            })
        );
    }*/
}