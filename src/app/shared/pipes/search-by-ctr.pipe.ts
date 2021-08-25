import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByCTR'
})
export class SearchByCTRPipe implements PipeTransform {

  transform(users: [], args: any): unknown {
    if(args !== ""){
      let usersAre = [];
      let strArray = args.trim().toLowerCase().split(",");
      users.filter((user : any)=>{
        for(var str of strArray){
          let strName = str.trim();
          if(strName == ""){
            break ;
          }
          if(user.candidateProfileKey){
            if(user.candidateProfileKey.desiredRoles.toLowerCase().indexOf(strName) !== -1){
              usersAre.push(user);
              break ;
            }else if(user.candidateProfileKey.desiredCompanies.toLowerCase().indexOf(strName) !== -1){
              usersAre.push(user);
              break ;
            }else if(user.candidateProfileKey.introduceYouToo.toLowerCase().indexOf(strName) !== -1){
              usersAre.push(user);
              break ;
            }
          }else if(user.candidateProfileKey == undefined){
            if(user.desiredRoles.toLowerCase().indexOf(strName) !== -1){
              usersAre.push(user);
              break ;
            }else if(user.desiredCompanies.toLowerCase().indexOf(strName) !== -1){
              usersAre.push(user);
              break ;
            }else if(user.introduceYouToo.toLowerCase().indexOf(strName) !== -1){
              usersAre.push(user);
              break ;
            }
          }
        }
      });
      return usersAre;
    }else{
      return users;
    }
  }

}
