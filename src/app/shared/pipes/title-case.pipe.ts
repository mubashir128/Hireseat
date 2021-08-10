import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {

  transform(value: String, ...args: unknown[]): unknown {
    let first = value.substr(0,1).toUpperCase();
    return first + value.substr(1); 
  }

}
