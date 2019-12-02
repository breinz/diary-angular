import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import EventCategory from './eventCategory.model';
import { BehaviorSubject } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class EventCategoryService {

    public list = new BehaviorSubject<EventCategory[]>(null);
    public category = new BehaviorSubject<EventCategory>(null);

    constructor(
        private api: HttpClient
    ) {
        this.getList();
    }

    public getList() {
        this.api.get<EventCategory[]>("/event/category").subscribe(list => {
            this.list.next(list);
        });
    }

    public getCategory(id: string) {
        return this.api.get<EventCategory>('/event/category/category', {
            params: { id: id }
        }).pipe(
            tap(category => {
                this.category.next(category);
            })
        );
    }

    public add(category: EventCategory) {
        return this.api.post<{ ok: boolean, id: string }>("/event/category", category)
            .pipe(
                tap(res => {
                    this.getList();
                })
            );
    }

    public patch(id: string, values: EventCategory) {
        return this.api.patch<{ ok: boolean }>("/event/category", values, {
            params: { id: id }
        }).pipe(
            tap(res => {
                this.getList();
            })
        );
    }

    public delete(category: EventCategory) {
        return this.api.delete("/event/category", {
            params: { id: category._id }
        }).pipe(
            tap(res => {
                this.getList();
            })
        );
    }
}