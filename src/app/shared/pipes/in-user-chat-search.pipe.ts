import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Pipe({
  name: 'inUserChatSearch'
})
export class InUserChatSearchPipe implements PipeTransform {

  loggedInUser: any;
  constructor(private userService: UserService){
    this.loggedInUser = this.userService.getUserData();
  }

  transform(users: [], args: any): unknown {
    
    if(args !== undefined){
      return users.filter((user : any)=>{
        if(user.user1._id != this.loggedInUser._id){
          return (user.user1.fullName.toLowerCase().indexOf(args.toLowerCase()) !== -1) ? true : (user.user1.email.toLowerCase().indexOf(args.toLowerCase()) !== -1) ? true : false;
        }else if(user.user2._id != this.loggedInUser._id){
          return (user.user2.fullName.toLowerCase().indexOf(args.toLowerCase()) !== -1) ? true : (user.user2.email.toLowerCase().indexOf(args.toLowerCase()) !== -1) ? true : false;
        }else{
          return user;
        }
      });
    }else{
      return users;
    }

  }

}
