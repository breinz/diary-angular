import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixed'
})
export class FixedPipe implements PipeTransform {

  transform(value: number, length: number = 2): string {
    if (value == undefined || value === null) {
      return null;
    }

    if (typeof value !== "number") {
      return value;
    }

    return value.toFixed(length);
  }

}
