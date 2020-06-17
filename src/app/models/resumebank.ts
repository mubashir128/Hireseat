export interface IResumeBank {    
    _id?:String;
    firstName: string;
    lastName: string;
    tags: any;  
    fileURL:string;
    experience:number;
    jobPostProfieId:String
}

export class ResumeBank {
    _id?:String;
    firstName: string;
    lastName: string;
    tags: any;  
    fileURL: string = '';
    experience:number;
    constructor() {
        this.firstName= '';
        this.lastName='';
        this.experience;
     }
    jobPostProfieId:String
}

export class ResumeVideo {
    email : string;
    time : any;
    
    constructor(){
        this.email='';
        this.time='1Hour';
    }
}