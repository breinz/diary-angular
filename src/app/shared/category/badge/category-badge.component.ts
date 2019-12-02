import { OnInit, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: "app-category-badge",
    templateUrl: "./category-badge.component.html",
    styleUrls: ["./category-badge.component.scss"]
})
export class CategoryBadgeComponent implements OnInit {
    @Input() category: { icon: string, color: string, name: string };

    constructor(
        private sanitizer: DomSanitizer
    ) {

    }

    ngOnInit() {

    }

    public setColorVar() {
        if (this.category) {
            return this.sanitizer.bypassSecurityTrustStyle("--color:" + this.category.color);
        }

        return null;
    }
}