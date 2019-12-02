# Diary Angular

[Diary app](http://julien-breiner.com) Front End
- Track your Expenses by categories, and set up Reports
- Track Events by categories
- Track People you meet
- Create Lists of various things
- View everything on a Calendar

Altough I'm extensively using this app, its main purpose is to serve as portfolio.

## Development infos

Generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9 and uses
- Components
- Services
- Directives ([see](https://github.com/breinz/diary-angular/blob/master/src/app/shared/link.directive.ts))
- Pipes ([see](https://github.com/breinz/diary-angular/blob/master/src/app/shared/fixed.pipe.ts))
- Modules (lazy loaded)
- Routes ([see](https://github.com/breinz/diary-angular/blob/master/src/app/settings/settings-routing.module.ts)) + Guards ([see](https://github.com/breinz/diary-angular/blob/master/src/app/settings/country/country.guard.ts))
- ReactiveForms + Validators ([see](https://github.com/breinz/diary-angular/blob/master/src/app/user/signin/signin.component.ts))
- HTTPClient
- Interceptors ([see](https://github.com/breinz/diary-angular/blob/master/src/app/api-interceptor.service.ts))

Uses 
- [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
- [Bootstrap toggle](https://www.bootstraptoggle.com/)
- [Fontawesome](https://fontawesome.com/icons?d=gallery&m=free)
- [Pug](https://pugjs.org/api/getting-started.html) (some, very few ... not the best with angular IMO)
- And API, writen in expess (GET, POST, PATCH, DELETE)

## Currently working on

- The people section
- The Calendar section

## Ideas

- Récurring events (cron based syntax)