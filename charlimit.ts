import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'charlimit' })
export class LimitPipe implements PipeTransform {
   
  constructor() { }
  transform(text: string) {
    let charlimit = 20;
  
    if(!text || text.length <= charlimit )
    {
        return text;
    }


  let without_html = text.replace(/<(?:.|\n)*?>/gm, '');
  let trim_space =  without_html.trim().replace(/&nbsp;/g, '');

  let shortened = trim_space.substring(0, charlimit) + "...";
  return shortened;
  }
}
   