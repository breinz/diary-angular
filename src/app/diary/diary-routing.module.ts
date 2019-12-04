import { NgModule } from "@angular/core";
import { RouterModule, Routes, UrlSegment, UrlMatchResult, UrlSegmentGroup, Route } from '@angular/router';

import { DiaryComponent } from './diary.component';
import { DiaryDayComponent } from './day/diary-day.component';

// :year{4}/:month{2}
export function monthMatcher(url: UrlSegment[], group: UrlSegmentGroup, route: Route): UrlMatchResult {
    if (
        url.length === 2
        && url[0].path.length === 4
        && !isNaN(+url[0].path)
        && url[1].path.length === 2
        && !isNaN(+url[1].path
        )) {
        return {
            consumed: url,
            posParams: {
                year: url[0],
                month: url[1]
            }
        }
    }
    return null;
}

// :year{4}/:month{2}
export function dayMatcher(url: UrlSegment[]): UrlMatchResult {
    if (
        url.length === 3
        && url[0].path.length === 4
        && !isNaN(+url[0].path)
        && url[1].path.length === 2
        && !isNaN(+url[1].path)
        && url[2].path.length === 2
        && !isNaN(+url[2].path)
    ) {
        return {
            consumed: url,
            posParams: {
                year: url[0],
                month: url[1],
                day: url[2]
            }
        }
    }
    return null;
}

const routes: Routes = [
    { path: "", component: DiaryComponent },
    { matcher: monthMatcher, component: DiaryComponent },
    { matcher: dayMatcher, component: DiaryDayComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class DiaryRoutingModule { }