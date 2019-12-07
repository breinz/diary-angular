import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Expense from '../expense/expense.model';
import { People } from '../people/people.model';
import { Event } from '../event/event.model';

@Injectable({ providedIn: "root" })
export class DiaryService {

    constructor(
        private api: HttpClient
    ) {

    }

    public getElements(year: string, month: string) {
        return this.api.get<{ expenses: Expense[], people: People[], events: Event[] }>("/diary", {
            params: { year, month }
        });
    }

    public getDay(year: string, month: string, day: string) {
        return this.api.get<{ expenses: Expense[], people: People[], events: Event[] }>("/diary/day", {
            params: { year, month, day }
        });
    }

    public sendContact(data: { reason: string, email: string, name: string, company: string, city: string, message: string }) {
        return this.api.post("/contact", data);
    }
}