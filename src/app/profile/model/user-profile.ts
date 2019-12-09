export interface IProfile {
    update_id:string;   
    companyName: string;
    aboutComp: string;
    locOfHeadOff: string;
    noOfEmp: any;
    webSiteLink: string;
    fbLink: string;
    twittLink: string;
    youtubeLink: string;
    linkedInLink: string;
    contactName: string;
    phoneNumber: string;
    email: string;
    fullName:string;
    phoneNo:string;
    ratingPoints:Number;
    ranking:any;
}

export class Profile {
    update_id:string;    
    companyName: string;
    aboutComp: string;
    locOfHeadOff: string;
    noOfEmp: any;
    webSiteLink: string;
    fbLink: string;
    twittLink: string;
    youtubeLink: string;
    linkedInLink: string;
    contactName: string;
    phoneNumber: string;
    email: string;
    fullName:string;
    phoneNo:string
    ratingPoints:Number;
    ranking:any;
    constructor() {
        this.companyName = '';
        this.aboutComp = '';
        this.locOfHeadOff = '';
        this.noOfEmp = 0;
        this.webSiteLink = '';
        this.fbLink = '';
        this.twittLink = '';
        this.youtubeLink = '';
        this.linkedInLink = '';
        this.contactName = '';
        this.phoneNumber = '';
        this.email = '';
        this.ratingPoints=0;
    }
}
