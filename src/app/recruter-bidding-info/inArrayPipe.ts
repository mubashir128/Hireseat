// import { Pipe,PipeTransform } from '@angular/core';

// @Pipe ({ name: 'inArray'})
// export class inArrayPipe implements PipeTransform {
//     transform(value:any, exponent:any): boolean {
//         let result = value.indexOf(exponent);
//         return result > -1
//     }
// }
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'inArray' })
export class inArrayPipe implements PipeTransform {

  transform(value: any, exponent: any): boolean {
    if(value){
      let result = value.indexOf(exponent);
      return result > -1;
    }
 
  }
}