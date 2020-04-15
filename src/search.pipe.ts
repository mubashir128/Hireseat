import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(users: any, args?: any): any {

    if(!users){
      return null;
    }

    if(!args){
      return users;
    }

    return users.filter((user : any)=>{
      return user.fullName.toLowerCase().indexOf(args.toLowerCase())!==-1 ? true : user.email.toLowerCase().indexOf(args.toLowerCase())!==-1 ? true : false;
    });
    
  }

}
