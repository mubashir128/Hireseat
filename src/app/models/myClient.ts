
export class MyClient {
    name: string;
    email: string;
    phoneNumber: string;
    comment: string;
    contactInfo: any;

    constructor() {
        this.name = '';
        this.email = '';
        this.phoneNumber = '';
        this.comment = '';
        this.contactInfo = {
            name : '',
            email : '',
            phoneNumber : '',
            title : ''
        };

    }
}
