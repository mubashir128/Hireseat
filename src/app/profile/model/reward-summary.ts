export interface IRewardSummary {
    skillsLosePt:Number;
    experienceLosePt:Number;
    personalityLosePt:Number;
    skillsErn:Number;
    experienceEarn:Number;
    personalityErn:Number;

}

export class RewardSummary  {
    skillsLosePt:Number;
    experienceLosePt:Number;
    personalityLosePt:Number;
    skillsErn:Number;
    experienceEarn:Number;
    personalityErn:Number;
    resumeErn:Number;
    interViewErn:Number;
    resumeLosePt:Number;
    interViewLosePt:Number;
    constructor() {        
        this.skillsLosePt=0;
        this.experienceLosePt=0;
        this.personalityLosePt=0;
        this.skillsErn=0;
        this.experienceEarn=0;
        this.personalityErn=0;
        this.interViewErn=0;
        this.resumeErn=0;
        this.resumeLosePt=0;
        this.interViewLosePt=0;
    }
}
