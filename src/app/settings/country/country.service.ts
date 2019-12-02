import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Country } from './country.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class CountryService {

    public list = new BehaviorSubject<Country[]>(null);

    constructor(
        private api: HttpClient
    ) {
        this.getList();
    }

    public getList() {
        this.api.get<Country[]>("/country").subscribe(list => {
            this.list.next(list);
        });
    }

    add(country: Country) {
        return this.api.post<{ ok: boolean, id: string }>("/country", country)
            .pipe(
                tap(res => {
                    this.getList();
                })
            );
    }

    patch(country: Country, values: Country) {
        return this.api.patch<{ ok: boolean }>("/country", values, { params: { id: country._id } })
            .pipe(
                tap(res => {
                    this.getList();
                })
            )
    }

    delete(country: Country) {
        return this.api.delete<{ ok: boolean }>("/country", { params: { id: country._id } })
            .pipe(
                tap(res => {
                    this.getList();
                })
            );
    }
}