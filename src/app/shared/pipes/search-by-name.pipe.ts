import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByName'
})
export class SearchByNamePipe implements PipeTransform {

  transform(users: any, args?: any): any {

    if(!users){
      return null;
    }

    if(!args){
      return users;
    }

    return users.filter((user : any)=>{
      let userFullName=user.firstName+" "+user.lastName;
      return userFullName.toLowerCase().indexOf(args.toLowerCase())!==-1 ? true : false;
    });
    
  }

}