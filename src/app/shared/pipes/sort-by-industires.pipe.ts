import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByIndustires'
})
export class SortByIndustiresPipe implements PipeTransform {

  transform(users: any, args?: any): any {

    if(!users){
      return null;
    }

    if(!args){
      return users;
    }

    if(args == 'all'){
      return users;
    }

    let usersAre = [];
    users.filter((user)=>{
      user.industries.filter((industry)=>{
        if(industry.name.trim().toLowerCase() == args.trim().toLowerCase()){
          usersAre.push(user);
        }
      });
    });
    return usersAre;
  }

}
