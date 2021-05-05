import { Pipe, Input, PipeTransform } from "@angular/core";

@Pipe({
    name:'textHighLight'
})
export class TextHighLightPipe implements PipeTransform  {
    constructor(){}
    transform(name:string,serchText:string){
        let highLightedName = '';
        let search = serchText;
        if(serchText){
            var re = new RegExp(search, 'gi'); //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
         return name.replace(re, "<mark>$&</mark>");

        }else{
            
            highLightedName = name;
            return highLightedName;


        }


    }
    
}