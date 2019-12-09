import { Component,Input,OnChanges} from '@angular/core';
import { IJobProfile } from '../models/job-profile';
import { IProfile } from '../profile/model/user-profile';
import { UserService } from '../_services/user.service'
 
@Component({
  selector: 'app-job-profile-details',
  templateUrl: './job-profile-details.component.html',
  styleUrls: ['./job-profile-details.component.css']
})
export class JobProfileDetailsComponent implements OnChanges {
  @Input() jobProfileKey: any; 
  @Input() employerProfile:any;
  jobProfile: IJobProfile;  
  employer: IProfile;
  employerKey: string;
  constructor(private userService:UserService) { }

  ngOnChanges() {       
    if (this.jobProfileKey != undefined) {     
      this.jobProfile=this.jobProfileKey;     
    }

    if(this.employerProfile != undefined){     
      this.userService.getEmployerProfile(this.employerProfile._id).subscribe((data:IProfile)=>{      
       this.employer=data;    
      },(error)=>{
        console.log(error);
      })
      
    }
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

}
