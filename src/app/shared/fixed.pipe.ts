import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixed'
})
/**
 * Simple pipe transforming a number using `toFixed` method
 * 
 * @usage {number} | fixed[:{number}]
 */
export class FixedPipe implements PipeTransform {

  /**
   * 
   * @param {number} value The number to transform
   * @param {number} length How many decimals to keep
   */
  transform(value: number, length: number = 2): string {
    if (value == undefined || value === null) {
      // Don't use !value because 0 should be treated as a number
      return "";
    }

    if (typeof value !== "number") {
      return value;
    }

    return value.toFixed(length);
  }

}
