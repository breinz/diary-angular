import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  public getExpenses(period: string = "month", date?: Date) {
    return this.http.get<{ expenses: any, report: any }>("/expense");
  }
}
