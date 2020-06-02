import { Utils } from "./utils/utils";
export interface IResume {
  key?: string;
  _id?: String;
  socialSecurityNum: string;
  recruiterKey: string;
  employerKey: string;
  jobType: string;
  candidateName: string;
  resumeType: string;
  resumeBank_id: any;
  bidStatus: any;
}

export class Resume {
  _id?: String;
  candidateName: string;
  socialSecurityNum: string;
  recruiterKey: string;
  employerKey: string;

  jobType: string;
  public static JOB_TYPE_FULL_TIME = "FULL_TIME";
  public static JOB_TYPE_PART_TIME = "PART_TIME";

  totalWorkExpYrs: number;
  totalWorkExpMonths: number;

  locationPref: string;
  interestedJobTitles: string;

  expectedSalaryMin: number;
  expectedSalaryMax: number;
  currencyCode: string = "USD";
  strongPoint1: string;
  strongPoint2: String;
  strongPoint3: String;
  fileURL: string = "";
  resumeType: string = "";
  resumeBank_id: any;
  bidStatus: any;
  // new entries
  jobTitle: string;
  location: string;
  phoneNumber: number;
  email: string;
  Employers1: string;
  Employers2: string;
  skills: string;
  linkedIn: string;
  referralJobTitle1: string;
  referralEmail1: string;
  referralPhoneNumber1: number;
  // 2nd
  referralJobTitle2: string;
  referralEmail2: string;
  referralPhoneNumber2: number;
  // 3rd
  referralJobTitle3: string;
  referralEmail3: string;
  referralPhoneNumber3: number;
  comments: string;
  bookmark;
  constructor() { }

  public static getSampleObject(): Resume {
    let sampleResume: Resume = new Resume();
    sampleResume.candidateName = "Sample Candidate Name";
    sampleResume.socialSecurityNum = "457-55-5462";
    let randomInt = Utils.getRandomInt(0, 1);
    if (randomInt === 0) sampleResume.jobType = Resume.JOB_TYPE_FULL_TIME;
    else sampleResume.jobType = Resume.JOB_TYPE_PART_TIME;

    sampleResume.totalWorkExpYrs = Utils.getRandomInt(1, 10);
    sampleResume.totalWorkExpMonths = Utils.getRandomInt(1, 12);

    sampleResume.locationPref = "New York, Washingston DC";
    sampleResume.interestedJobTitles =
      "Senior Java Developer, Advanced Java Developer";

    sampleResume.expectedSalaryMax = Utils.getRandomInt(1, 100) * 10000;
    sampleResume.expectedSalaryMin = Utils.getRandomInt(
      1,
      sampleResume.expectedSalaryMax
    );

    return sampleResume;
  }

  public static getBlankObject() {
    let blankResume: Resume = new Resume();
    blankResume.candidateName = "";
    blankResume.socialSecurityNum = "";
    blankResume.jobType = Resume.JOB_TYPE_PART_TIME;

    blankResume.totalWorkExpYrs = 0;
    blankResume.totalWorkExpMonths = 0;

    blankResume.locationPref = "";
    blankResume.interestedJobTitles = "";

    blankResume.expectedSalaryMax = 0;
    blankResume.expectedSalaryMin = 0;
    blankResume.jobTitle = "";
    blankResume.location = "";
    blankResume.phoneNumber;
    blankResume.Employers1 = "";
    blankResume.Employers2 = "";
    blankResume.skills = "";
    blankResume.linkedIn = "";

    blankResume.referralJobTitle1 = "";
    blankResume.referralEmail1 = "";
    blankResume.referralPhoneNumber1;

    blankResume.referralJobTitle2 = "";
    blankResume.referralEmail2 = "";
    blankResume.referralPhoneNumber2;

    blankResume.referralJobTitle3 = "";
    blankResume.referralEmail3 = "";
    blankResume.referralPhoneNumber3;

    blankResume.comments = "";
    return blankResume;
  }
}
