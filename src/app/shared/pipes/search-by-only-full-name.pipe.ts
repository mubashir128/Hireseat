import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByOnlyFullName'
})
export class SearchByOnlyFullNamePipe implements PipeTransform {

  transform(users: any, args?: any): any {
    if(!users){
      return null;
    }

    if(!args){
      return users;
    }

    return users.filter((user : any)=>{
      return user.fullName.toLowerCase().indexOf(args.toLowerCase())!==-1 ? true : false;
    }); 
  }

}
