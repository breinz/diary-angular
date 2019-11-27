import { Pipe, PipeTransform } from '@angular/core';

interface Element {
  deleted: boolean;
}

@Pipe({
  name: 'deleted'
})
export class DeletedPipe implements PipeTransform {

  /**
   * should return type T[] 
   * Angular language service bug https://github.com/angular/angular/issues/21224
   */
  transform<T>(list: T[], show: boolean = true): any {
    let newList = [];
    for (const element of list) {
      if (element.hasOwnProperty("deleted")) {
        if (element['deleted'] === show) {
          newList.push(element);
        }
      }
    }
    return newList;
    // console.log(el, show);
    // return el.deleted === show;
  }

}
