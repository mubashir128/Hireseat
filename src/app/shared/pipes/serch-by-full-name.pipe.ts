import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serchByFullName'
})
export class SerchByFullNamePipe implements PipeTransform {

  transform(users: [], args: any): unknown {
    if(args !== ""){
      return users.filter((user : any)=>{
        if(user.candidate_id !== undefined){
          return (user.candidate_id.fullName.toLowerCase().indexOf(args.toLowerCase()) !== -1) ? true : false;
        }else if(user.candidateKey !== undefined){
          return (user.candidateKey.fullName.toLowerCase().indexOf(args.toLowerCase()) !== -1) ? true : false;
        }else{
          return false;
        }
      });
    }else{
      return users;
    }
  }

}
