export interface IRecruiterProfile {
    $key?: string;
    createdAt: number;
    logo: string;
    companyName: string;
    companyDescription: string;
    headOfficeLocation: string;
    employeeCount: number;
    websiteLink: string;
    fbLink: string;
    twitterLink: string;
    youtubeLink: string;
    linkedinLink: string;
    contactName: string;
    phoneNumber: string;
    email: string;
}

export class RecruiterProfile {
    logo: string;
    companyName: string;
    companyDescription: string;
    headOfficeLocation: string;
    employeeCount: number;
    websiteLink: string;
    fbLink: string;
    twitterLink: string;
    youtubeLink: string;
    linkedinLink: string;
    contactName: string;
    phoneNumber: string;
    email: string;

    constructor() {
        this.companyName = '';
        this.companyDescription = '';
        this.headOfficeLocation = '';
        this.employeeCount = 0;
        this.websiteLink = '';
        this.fbLink = '';
        this.twitterLink = '';
        this.youtubeLink = '';
        this.linkedinLink = '';
        this.contactName = '';
        this.phoneNumber = '';
        this.email = '';
    }
}
