import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByCTR'
})
export class SearchByCTRPipe implements PipeTransform {

  transform(users: [], args: any): unknown {
    try{
      if(args !== ""){
        let usersAre = [];
        let names = args.trim() ? args.trim() : "";
        let strArray = names.toLowerCase().split(",");
        users.filter((user : any)=>{
          for(var str of strArray){
            let strName = str.trim();
            if(strName == ""){
              break ;
            }
            if(user.candidateProfileKey ){
              // if(user.candidateProfileKey.desiredRoles.toLowerCase().indexOf(strName) !== -1){
              //   usersAre.push(user);
              //   break ;
              // }else if(user.candidateProfileKey.desiredCompanies.toLowerCase().indexOf(strName) !== -1){
              //   usersAre.push(user);
              //   break ;
              // }else 
              if((user.candidateProfileKey && user.candidateProfileKey.introduceYouToo && user.candidateProfileKey.introduceYouToo.toLowerCase().indexOf(strName) !== -1) || (user.fullName && user.fullName.toLowerCase().indexOf(strName) !== -1)){
                usersAre.push(user);
                break ;
              }
            }else if(!user.candidateProfileKey){
              // if(user.desiredRoles && user.desiredRoles.toLowerCase().indexOf(strName) !== -1){
              //   usersAre.push(user);
              //   break ;
              // }else if(user.desiredCompanies && user.desiredCompanies.toLowerCase().indexOf(strName) !== -1){
              //   usersAre.push(user);
              //   break ;
              // }else 
              if((user.introduceYouToo && user.introduceYouToo.toLowerCase().indexOf(strName) !== -1) || (user.candidate_id && user.candidate_id.fullName && user.candidate_id.fullName.toLowerCase().indexOf(strName) !== -1)){
                usersAre.push(user);
                break ;
              }
            }
          }
        });
        console.log("usersAre : ",usersAre);
        return usersAre;
      }else{
        return users;
      }
    }catch(err){
      console.log("err : ",err);
    }
  }

}
