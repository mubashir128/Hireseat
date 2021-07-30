import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serchByJobTitle'
})
export class SerchByJobTitlePipe implements PipeTransform {

  transform(users: [], args: any): unknown {
    if(args !== undefined){
      return users.filter((user : any)=>{
        return (user.jobTitle.toLowerCase().indexOf(args.toLowerCase()) !== -1) ? true : false;
      });
    }else{
      return users;
    }
  }

}
