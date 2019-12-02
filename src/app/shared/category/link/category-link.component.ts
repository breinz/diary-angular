import { OnInit, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: "app-category-link",
    templateUrl: "./category-link.component.html",
    styleUrls: ["./category-link.component.scss"]
})
export class CategoryLinkComponent implements OnInit {

    @Input() category: { name: string, icon: string, color: string };
    @Input() link: string;

    constructor(
        private sanitizer: DomSanitizer
    ) {

    }

    ngOnInit() {

    }

    public setColorVar() {
        let color = this.category ? this.category.color : "#EEE";
        return this.sanitizer.bypassSecurityTrustStyle("--color:" + color);
    }
}