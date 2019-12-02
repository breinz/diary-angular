import { OnInit, Component } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
    selector: "app-breadcrumb",
    templateUrl: "./breadcrumb.component.html",
    styleUrls: ["./breadcrumb.component.scss"]
})
export class BreadcrumbComponent implements OnInit {
    public items: (string | string[])[];
    constructor(private bc: BreadcrumbService) {

    }

    ngOnInit() {
        this.bc.bc.subscribe(bc => {
            this.items = bc;
        })
    }

    public isLink(item: string | string[]): boolean {
        return Array.isArray(item);
    }

    public hasIcon(index: number): boolean {
        return index < this.items.length - 1;
    }
}