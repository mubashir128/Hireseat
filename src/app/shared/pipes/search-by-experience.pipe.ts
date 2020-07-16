import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByExperience'
})
export class SearchByExperiencePipe implements PipeTransform {

  transform(users: any, ...args: any[]): any {
    if(!users){
      return null;
    }

    if(!args){
      return users;
    }

    return users.filter((user : any)=>{
      if((args[0] === undefined && args[1] === undefined) || (args[0] === null && args[1] === null)){
        return true;
      }

      if(args[0] === undefined && user.experience <= args[1]){
        return true;
      }else if(args[1] === undefined && user.experience >= args[0]){
        return true;
      }

      if(args[0] === null && user.experience <= args[1]){
        return true;
      }else if(args[1] === null && user.experience >= args[0]){
        return true;
      }

      if(args[0] === undefined && args[1] === null){
        return true;
      } else if(args[1] === undefined && args[0] === null){
        return true;
      }

      if(user.experience >= args[0] && user.experience <= args[1]){ 
        return true;
      }else{
        return false;
      }

    });
  }

}
