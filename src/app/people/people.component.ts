import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslationService } from '../translation.service';
import { PeopleService } from './people.service';
import { People } from './people.model';
import { FlashService } from '../shared/flash/flash.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { exhaustMap, tap, filter } from 'rxjs/operators';
import { BreadcrumbService } from '../layout/breadcrumb/breadcrumb.service';

@Component({
    selector: "app-people",
    templateUrl: "./people.component.html"
})
export class PeopleComponent implements OnInit, OnDestroy {

    public loading: boolean = false;

    public list: People[];

    public _showDeleted: boolean = false;

    private route_sub: Subscription;
    private list_sub: Subscription;
    private sub: Subscription;

    constructor(
        public t: TranslationService,
        private service: PeopleService,
        private flash: FlashService,
        private route: ActivatedRoute,
        private router: Router,
        private bc: BreadcrumbService
    ) {

    }

    ngOnInit() {
        this.bc.build('people');

        this.service.getList();

        /* this.sub = this.route.url.pipe(
             tap(url => {
                 this._showDeleted = url.length > 0 && url[0].path == "deleted";
             }),
             exhaustMap(res => {
                 return this.service.list
             })
         ).subscribe(list => {
             this.list = list;
 
             //console.log(this._showDeleted, this.getList);
             if (this._showDeleted && this.getList().length == 0) {
                 this.router.navigate(["/people"]);
             }
         });*/

        this.list_sub = this.service.list.subscribe(list => {
            if (list === null) {
                return this.loading = true;
            }

            this.loading = false;
            this.list = list;
        });

        this.route_sub = this.route.url.subscribe(url => {
            this._showDeleted = url.length > 0 && url[0].path == "deleted";
        });
    }

    public getList(): People[] {
        let list: People[] = [];
        for (const people of this.list) {
            if (people.deleted === this._showDeleted) {
                list.push(people);
            }
        }
        return list;
    }

    public onDelete(e: Event, people: People) {
        e.preventDefault();

        if (confirm(this.t.t("people.confirm.delete"))) {
            this.service.delete(people).subscribe(res => {
                this.flash.success(this.t.t("people.flash.deleted"));
            }, err => {
                this.flash.error(this.t.t("people.flash.not_found"));
            });
        }
    }

    public onRecover(e: Event, people: People) {
        e.preventDefault();

        this.service.recover(people).subscribe(res => {
            this.flash.success(this.t.t("people.flash.recovered"));
            this.router.navigate(['/people']);
        }, err => {
            this.flash.error("people.flash.not_found");
        });

    }

    public onRemove(e: Event, people: People) {
        e.preventDefault();

        if (confirm(this.t.t('people.confirm.remove', people.firstName))) {

            this.service.remove(people).subscribe(res => {
                this.flash.success(this.t.t("people.flash.removed", people.firstName));
                this.router.navigate(['/people']);
            });
        }
    }

    public showDeleted() {
        this._showDeleted = !this._showDeleted;
    }

    public listContainsDeleted(): boolean {
        if (!this.list) return false;

        for (const people of this.list) {
            if (people.deleted) return true;
        }

        return false;
    }

    ngOnDestroy() {
        //this.sub.unsubscribe();
        this.list_sub.unsubscribe();
        this.route_sub.unsubscribe();
    }
}