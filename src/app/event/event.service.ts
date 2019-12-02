import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Event } from './event.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class EventService {

    public list = new BehaviorSubject<Event[]>(null);
    public event: Event;

    constructor(
        private api: HttpClient
    ) {
        this.getList();
    }

    public getList() {
        this.api.get<Event[]>("/event").subscribe(res => {
            this.list.next(res);
        });
    }

    public getEvent(id: string, populated: boolean) {
        let params = new HttpParams();
        params = params.append("id", id);
        params = params.append("populated", populated ? "1" : "0");

        return this.api.get<Event>("/event/event", { params })
            .pipe(
                tap(res => {
                    this.event = res;
                })
            );
    }

    public add(event: Event) {
        return this.api.post<{}>("/event", event).pipe(
            tap(res => {
                this.getList();
            })
        );
    }

    public patch(id: string, event: Event) {
        return this.api.patch<{}>('/event', event, {
            params: { id }
        }).pipe(
            tap(res => {
                this.getList();
            })
        );
    }

    public delete(event: Event) {
        let modified = { ...event };
        modified.deleted = true;
        return this.patch(event._id, modified);
    }

    public recover(event: Event) {
        let modified = { ...event };
        modified.deleted = false;

        return this.patch(event._id, modified);
    }

    public remove(event: Event) {
        return this.api.delete<{}>("/event", {
            params: { id: event._id }
        }).pipe(
            tap(res => {
                this.getList();
            })
        );
    }
}