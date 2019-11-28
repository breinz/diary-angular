import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ExpenseCategory } from './expense-category.model';
import { tap, map } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoadingStatusService } from 'src/app/loading-status.service';

@Injectable({ providedIn: "root" })
export class ExpenseCategoryService {

    public list = new BehaviorSubject<ExpenseCategory[]>(null);

    constructor(
        private api: HttpClient,
        private loader: LoadingStatusService
    ) {
        this.getList();
    }

    public find(id: string) {
        return this.list
            .pipe(
                map(list => {
                    if (list) {

                        for (const category of list) {
                            if (category._id === id) {
                                return category;
                            }
                        }

                        throw "Element not found";
                    }
                    return null;
                })
            );
    }

    public add(category: ExpenseCategory) {
        return this.api
            .post<{ success: boolean }>("/expense/category/new", category)
            .pipe(
                tap(res => {
                    this.getList()
                    // this.list.value.push(category);
                    // this.list.next(this.list.value);
                })
            );
    }

    public edit(category: ExpenseCategory, values: ExpenseCategory) {
        return this.api
            .post<{ sucess: boolean }>("/expense/category/edit", values, { params: { id: category._id } })
            .pipe(
                tap(res => {
                    Object.assign(category, values);
                    this.list.next(this.list.value);
                })
            );
    }

    public delete(category: ExpenseCategory) {
        return this.api
            .patch<{ success: boolean }>("/expense/category/delete", null, {
                params: { id: category._id }
            })
            .pipe(
                tap(res => {
                    category.deleted = true;
                    this.list.next(this.list.value);
                })
            );
    }

    public recover(category: ExpenseCategory) {
        return this.api
            .patch<{ success: boolean }>("/expense/category/recover", null, {
                params: { id: category._id }
            }).pipe(
                tap(res => {
                    category.deleted = false;
                    this.list.next(this.list.value);
                })
            )
    }

    public remove(category: ExpenseCategory) {
        return this.api
            .delete<{ success: boolean }>("/expense/category/remove", {
                params: { id: category._id }
            }).pipe(
                tap(res => {
                    for (let index = 0; index < this.list.value.length; index++) {
                        const element = this.list.value[index];
                        if (element._id === category._id) {
                            this.list.value.splice(index, 1);
                            break;
                        }
                    }
                    this.list.next(this.list.value);
                })
            )
    }

    /**
     * @private
     * @use list
     * Find all expense categories 
     */
    private getList() {
        this.loader.loaderStart();

        return this.api
            .get<{ categories: ExpenseCategory[] }>("/expense/category")
            .subscribe(res => {
                this.loader.loaderEnd();
                this.list.next(res.categories);
            });
    }
}