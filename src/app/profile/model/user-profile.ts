export interface IProfile {
    update_id: string;
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
    fullName: string;
    phoneNo: string;
    ratingPoints: Number;
    ranking: any;
    yearOfExperience: any;
    industries: any;
    roles: any;
    companies: any;
    bio: any;

    rate: any;
    mins: any;
    post: boolean;

}

export class Profile {
    update_id: string;
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
    fullName: string;
    phoneNo: string
    ratingPoints: Number;
    ranking: any;
    yearOfExperience: any;
    industries: any;
    roles: any;
    companies: any;
    bio: any;
    rate: any;
    mins: any;
    post: boolean;
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
        this.ratingPoints = 0;
        this.yearOfExperience = '';
        this.industries = '';
        this.roles = '';
        this.companies = '';
        this.bio = '';
        // this.rate = 0;
        this.mins = 0;
        this.post = false;
    }
}
