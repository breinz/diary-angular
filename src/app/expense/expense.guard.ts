
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ExpenseService } from './expense.service';
import { FlashService } from '../shared/flash/flash.service';
import { TranslationService } from '../translation.service';
import { LoadingStatusService } from '../loading-status.service';

@Injectable({ providedIn: "root" })
export class ExpenseGuard implements CanActivate {

    constructor(
        private service: ExpenseService,
        private flash: FlashService,
        private router: Router,
        private t: TranslationService,
        private l: LoadingStatusService
    ) {

    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (route.routeConfig.path === ":id" || route.routeConfig.path === ":id/edit") {
            return this.loadExpense(route.params.id);
        }

        return false;

    }

    /**
     * Load the expense in ExpenseService.expense
     * 
     * If it doesn't exist, redirect to /expense with an error message
     * 
     * @param {string} id The expense id
     */
    private loadExpense(id: string): Promise<boolean> | boolean {

        // if (this.service.expense.value && this.service.expense.value._id === id) {
        //     // We already checked this expense
        //     return true;
        // }
        this.l.loaderStart();

        return new Promise((resolve, reject) => {

            this.service.getExpense(id).subscribe(
                res => {
                    this.l.loaderEnd();
                    resolve(true);
                },
                err => {
                    this.l.loaderEnd();
                    this.flash.error(this.t.t('expense.flash.not_found'));
                    this.router.navigate(['/expense']);
                    reject();
                });
        });
    }


}