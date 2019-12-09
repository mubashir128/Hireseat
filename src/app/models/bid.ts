export interface IBid {
    $key?: string;
   
    updatedAt: number;
    position: number;
    biddingEventKey: string;
    recruiterKey: string;
    recruiterName: string;
    resumeKey: String;
    bidAmount: number;
    BidNumber: number;
    candidateName: string;
    status: string;
    shortlisted: boolean;
    StrongPoint1:string;
    StrongPoint2:String;
    StrongPoint3:String;
    experienceMatchPoints:Number;
    personalityMatchPoints:Number;
    skillsMatchPoints:Number;
    comment:string;
    RecruiterCost:number;
    resumeCount:number;
}

export class Bid implements IBid {
    
    updatedAt: number;
    position: number;
    biddingEventKey: string = null;
    recruiterKey: string = null;
    recruiterName: string = null;
    resumeKey: String;
    bidAmount: number = null;
    candidateName: string = null;
    status: string = Bid.STATUS_BIDDING;
    shortlisted: boolean = false;
    BidNumber: number;
    StrongPoint1:string;
    StrongPoint2:String;
    StrongPoint3:String;
    experienceMatchPoints:Number;
    personalityMatchPoints:Number;
    skillsMatchPoints:Number;
    RecruiterCost:number;
    comment:string="";
    resumeCount:number;
    public static STATUS_WON = 'WON';
    public static STATUS_BIDDING = 'pending';
    public static STATUS_OUTBID = 'OUTBID';
}

