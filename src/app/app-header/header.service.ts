import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: "root" })
export class HeaderService {

    public category = new Subject<string>();
    public subCategory = new Subject<string>();

    constructor(
        private router: Router
    ) {

        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                let a = e.url.split('/');
                this.category.next(a[1]);
                if (a.length > 2) {
                    this.subCategory.next(a[2]);
                } else {
                    this.subCategory.next(null);
                }
            }
        })
    }

}