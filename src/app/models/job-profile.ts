import { DatePipe } from "@angular/common";

export interface IJobProfile {
    
    jobTitle: string;
    employerKey: string;
    companyName: string;
    jobBrief: string;
    jobType: number;
    //shortlistLimit: number;
   // resumeLimit: number;
    jobLocation: string;
    salaryFrom: number;
    salaryTo:number;
    salaryCycle: number;
    salaryNegotiable: boolean;
   // rewardMoney: number;
    minEducation: string;
    experienceFrom: number;
    experienceTo: number;
    skills: string;
    lang; number;
    langProficiency: number;
    jobShift: number;
    jobDescription: string;
    contract: number;
}
export class JobProfile implements IJobProfile {
    jobTitle: string;
    createdAt: number = Date.now();
    employerKey: string;
    companyName: string;
    jobBrief: string;
    jobType: number; 
    jobLocation: string;
    salaryFrom: number;
    salaryTo:number;
    salaryCycle: number;
    salaryNegotiable: boolean;   
    minEducation: string;
    experienceFrom: number;
    experienceTo: number;
    skills: string;
    lang; number;
    langProficiency: number;
    jobShift: number;
    jobDescription: string;
    contract: number;

    constructor(employerKey: string, companyName: string) {
        this.jobTitle = '';
        this.employerKey = employerKey;
        this.companyName = companyName;
        this.jobBrief = '';
        this.jobType = 0;
     //   this.shortlistLimit = 5;
     //   this.resumeLimit = 5;
        this.jobLocation = '';
        this.salaryFrom = 0;
        this.salaryTo = 0;
        this.salaryCycle = 0;
        this.salaryNegotiable = false;
       // this.rewardMoney = 100;
        this.minEducation = '';
        this.experienceFrom = 0;
        this.experienceTo =  0;
        this.skills = '';
        this.lang = '';
        this.langProficiency = 0;
        this.jobShift = 0;
        this.jobDescription = '';
        this.contract = 0;
    }
}