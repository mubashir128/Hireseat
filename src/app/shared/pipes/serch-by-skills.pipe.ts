import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serchBySkills'
})
export class SerchBySkillsPipe implements PipeTransform {

  transform(users: [], args: any): unknown {
    if(args !== undefined){
      return users.filter((user : any)=>{
        return (user.skills.toLowerCase().indexOf(args.toLowerCase()) !== -1) ? true : false;
      });
    }else{
      return users;
    }
  }

}
