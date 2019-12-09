export interface IUser {
    $key?: string;
  
    name: string;
    type: number;
    email: string;
    password: string;
    phoneNumber: string;
    employerKey: string;
    recruiterKey: string;
    companyName: string;
}

export class User {
   
    name: string;
    type: number;
    email: string;
    password: string;
    phoneNumber: string;
    employerKey: string;
    recruiterKey: string;
    companyName: string;
    public static TYPE_RECRUITER: number = 0;
    public static TYPE_EMPLOYER: number = 1;

    constructor(type: number) {
        this.name = '';
        this.type = type;
        this.email = '';
        this.password = '';
        this.phoneNumber = '';
        this.employerKey = '';
        this.recruiterKey = '';
        this.companyName = '';
    }
}
