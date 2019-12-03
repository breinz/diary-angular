import { OnInit, Component } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';

@Component({
    selector: "app-loading-alert",
    templateUrl: "./loading-alert.component.html"
})
export class LoadingAlertComponent implements OnInit {
    constructor(
        public t: TranslationService
    ) {

    }

    ngOnInit() {

    }
}