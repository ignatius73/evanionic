import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the AmountPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'amount',
})
export class AmountPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, ...args) {
    return value/100;
  }
}
