import { RemainingTime } from '../models/remaining-time';
import {Utils} from './utils/utils';

export interface IBiddingEvent {
    $key?: string;
    _id:string;
    activationDate: number;
    expiryDate: number;
    jobProfileKey: any;
    status: string;
    seats: number;
    employerKey: string;
    bids: string[];
    jobTitle: string;
    rewardMoneyFrom: number;
    rewardMoneyTo:number;
    shortlistLimit: number;
    resumeLimit: number;
    employerCompanyName: string;
    jobLocation: string;

}

export class BiddingEvent implements IBiddingEvent {    
    activationDate: number;
    expiryDate: number;
    status: string;
    _id:string;
    seats: number;
    jobProfileKey: any;
    employerKey: string;
    bids: string[];

    jobTitle: string;
    rewardMoneyFrom: number = 0;
    rewardMoneyTo:number = 0;
    shortlistLimit: number;
    resumeLimit: number;
    employerCompanyName: string;
    jobLocation: string;    
    remainingTime:RemainingTime;
    
    public static STATUS_EXPIRED = 'EXPIRED';
    public static STATUS_SCHEDULED = 'SCHEDULED';
    public static STATUS_ACTIVE = 'ACTIVE';

    constructor() {
    }

    setJobProfile(jobProfileKey) {
        if (jobProfileKey) {
            this.jobProfileKey = jobProfileKey;
            //this.jobTitle = jobProfile.jobTitle;
            //this.rewardMoney = jobProfile.rewardMoney;
            //this.shortlistLimit = jobProfile.shortlistLimit;
            //this.resumeLimit = jobProfile.resumeLimit;
            //this.jobLocation = jobProfile.jobLocation;
        }
    }

    setEmployer(user) {
        this.employerKey = user._id;
        if (user.companyName)
            this.employerCompanyName = user.companyName;
        else
            this.employerCompanyName = '';
    }

    setAsActive() {
        this.status = BiddingEvent.STATUS_ACTIVE;
        //console.log('Bidding Activated');
    }

    setAsScheduled() {
        this.status = BiddingEvent.STATUS_SCHEDULED;
        //console.log('Bidding Scheduled');
    }

    setAsExpired() {
        this.status = BiddingEvent.STATUS_EXPIRED;
        //console.log('Bidding Expired');
    }

    // updateStatus() {
    //     let isActivationDateValid: boolean = true;
    //     let isExpiryDateValid: boolean = true;

    //     if (this.activationDate === undefined || this.activationDate === null)
    //         isActivationDateValid = false;
    //     if (this.expiryDate === undefined || this.expiryDate === null)
    //         isExpiryDateValid = false;

    //     if (isActivationDateValid && isExpiryDateValid) {
    //         let current = new Date();
    //         let activationDate = new Date(this.activationDate * 1000);
    //         let expiryDate = new Date(this.expiryDate * 1000);

    //         if (activationDate.getFullYear() <= current.getFullYear() && activationDate.getMonth() <= current.getMonth() && activationDate.getDate() <= current.getDate()) {
    //             if (expiryDate.getFullYear() >= current.getFullYear() && expiryDate.getMonth() >= current.getMonth() && expiryDate.getDate() >= current.getDate()) {
    //                 this.status = BiddingEvent.STATUS_ACTIVE;
    //             } else {
    //                 this.status = BiddingEvent.STATUS_EXPIRED;
    //             }
    //         } else {
    //             this.status = BiddingEvent.STATUS_SCHEDULED;
    //         }
    //     }
    // }

    updateStatus() {
      //  var remainingTime: RemainingTime = new RemainingTime();
        this.remainingTime = Utils.getRemainingTime(this);
    }
}