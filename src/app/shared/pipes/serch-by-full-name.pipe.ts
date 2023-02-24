import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serchByFullName'
})
export class SerchByFullNamePipe implements PipeTransform {

  transform(users: [], args: any, args2: any): unknown {
    if(args2){
      if(args !== ""){
        return users.filter((user : any)=>{
          let desiredUser = user?.desiredUser?.fullName?.trim()?.toLowerCase();
          let introUser = user?.introUser?.fullName?.trim()?.toLowerCase();
          let name = args?.trim()?.toLowerCase();
          
          if(desiredUser.indexOf(name) !== -1){
            return true;
          }else if(introUser.indexOf(name) !== -1){
            return true;
          }else{
            return false;
          }
        });
      }else{
        return users;
      }
    }else{ 
      if(args !== ""){
        return users.filter((user : any)=>{
          if(user.candidate_id){
            return (user.candidate_id?.fullName?.toLowerCase().indexOf(args.toLowerCase()) !== -1) ? true : false;
          }else if(user.candidateKey){
            return (user.candidateKey?.fullName?.toLowerCase().indexOf(args.toLowerCase()) !== -1) ? true : false;
          }else{
            return false;
          }
        });
      }else{
        return users;
      }
    }
  }

}
