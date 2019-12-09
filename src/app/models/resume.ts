import { Utils } from './utils/utils';
export interface IResume {
    key?: string;  
    _id?:String;
    socialSecurityNum: string;
    recruiterKey: string;
    jobType: string;
    candidateName: string;
    resumeType:string;
    resumeBank_id:any;
    bidStatus:any;
}

export class Resume {
    _id?:String;
    candidateName: string;
    socialSecurityNum: string;
    recruiterKey: string;
    jobType: string;
    public static JOB_TYPE_FULL_TIME = 'FULL_TIME';
    public static JOB_TYPE_PART_TIME = 'PART_TIME';

    totalWorkExpYrs: number;
    totalWorkExpMonths: number;

    locationPref: string;
    interestedJobTitles: string;

    expectedSalaryMin: number;
    expectedSalaryMax: number;
    currencyCode: string = 'USD';
    strongPoint1:string;
    strongPoint2:String;
    strongPoint3:String;
    fileURL: string = '';
    resumeType:string='';
    resumeBank_id:any;
    bidStatus:any;
    constructor() { }

    public static getSampleObject(): Resume {
        let sampleResume: Resume = new Resume();
        sampleResume.candidateName = "Sample Candidate Name";
        sampleResume.socialSecurityNum = "457-55-5462";
        let randomInt = Utils.getRandomInt(0, 1);
        if (randomInt === 0)
            sampleResume.jobType = Resume.JOB_TYPE_FULL_TIME;
        else
            sampleResume.jobType = Resume.JOB_TYPE_PART_TIME;

        sampleResume.totalWorkExpYrs = Utils.getRandomInt(1, 10);
        sampleResume.totalWorkExpMonths = Utils.getRandomInt(1, 12);

        sampleResume.locationPref = 'New York, Washingston DC';
        sampleResume.interestedJobTitles = 'Senior Java Developer, Advanced Java Developer';

        sampleResume.expectedSalaryMax = Utils.getRandomInt(1, 100) * 10000;
        sampleResume.expectedSalaryMin = Utils.getRandomInt(1, sampleResume.expectedSalaryMax);

        return sampleResume;
    }

    public static getBlankObject() {
        let blankResume: Resume = new Resume();
        blankResume.candidateName = "";
        blankResume.socialSecurityNum = "";
        blankResume.jobType = Resume.JOB_TYPE_PART_TIME;

        blankResume.totalWorkExpYrs = 0;
        blankResume.totalWorkExpMonths = 0;

        blankResume.locationPref = '';
        blankResume.interestedJobTitles = '';

        blankResume.expectedSalaryMax = 0;
        blankResume.expectedSalaryMin = 0;

        return blankResume;
    }
}
