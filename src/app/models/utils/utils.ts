import { IBiddingEvent } from '../bidding-event';
import { RemainingTime } from '../remaining-time'

export class Utils {
    public static STATUS_EXPIRED = 'EXPIRED';
    public static STATUS_SCHEDULED = 'SCHEDULED';
    public static STATUS_ACTIVE = 'ACTIVE';

    public static generatePushID = (function () {
        // Modeled after base64 web-safe chars, but ordered by ASCII.
        var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

        // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
        var lastPushTime = 0;

        // We generate 72-bits of randomness which get turned into 12 characters and appended to the
        // timestamp to prevent collisions with other clients.  We store the last characters we
        // generated because in the event of a collision, we'll use those same characters except
        // "incremented" by one.
        var lastRandChars = [];

        return function () {
            var now = new Date().getTime();
            var duplicateTime = (now === lastPushTime);
            lastPushTime = now;

            var timeStampChars = new Array(8);
            for (var i = 7; i >= 0; i--) {
                timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
                // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
                now = Math.floor(now / 64);
            }
            if (now !== 0) throw new Error('We should have converted the entire timestamp.');

            var id = timeStampChars.join('');

            if (!duplicateTime) {
                for (i = 0; i < 12; i++) {
                    lastRandChars[i] = Math.floor(Math.random() * 64);
                }
            } else {
                // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
                for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
                    lastRandChars[i] = 0;
                }
                lastRandChars[i]++;
            }
            for (i = 0; i < 12; i++) {
                id += PUSH_CHARS.charAt(lastRandChars[i]);
            }
            if (id.length != 20) throw new Error('Length should be 20.');

            return id;
        };
    })();

    public static getDate(timestamp: number) {
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(timestamp);

        var m_names = new Array("Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul", "Aug", "Sep",
            "Oct", "Nov", "Dec");
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var curr_year = d.getFullYear();

        return curr_date + " " + m_names[curr_month] + " " + curr_year;
    }

    public static getDateTime(timestamp: number): string {
        return Utils.getTime(timestamp) + ", " + Utils.getDate(timestamp);
    }

    static getTime(timestamp: number) {
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(timestamp);

        var h = (d.getHours() % 12) || 12; // show midnight & noon as 12
        return (
            (h < 10 ? '0' : '') + h +
            (d.getMinutes() < 10 ? ':0' : ':') + d.getMinutes() +
            // optional seconds display
            // ( d.getSeconds() < 10 ? ':0' : ':') + d.getSeconds() + 
            (d.getHours() < 12 ? ' AM' : ' PM')
        );
    }

    public static generateUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static getRemainingTime(biddingEvent: IBiddingEvent): RemainingTime {
        let remainingTime: RemainingTime = new RemainingTime();
        let currentDate: Date = new Date();
        let timeSinceActivation = biddingEvent.activationDate - currentDate.getTime() / 1000;
        let timeSinceExpiry = biddingEvent.expiryDate - currentDate.getTime() / 1000;
        if (timeSinceActivation < 0) {
            // Ongoing or expired Bid
            if (timeSinceExpiry > 0) {
                // Ongoing Bid
                if (biddingEvent.status !== this.STATUS_ACTIVE) {
                    biddingEvent.status = this.STATUS_ACTIVE;
                    remainingTime.biddingStatusChanged = true;
                }
                remainingTime.remainingDays = Math.floor((((timeSinceExpiry / 60) / 60) / 24));
                let remainingDaysInSeconds = remainingTime.remainingDays * 24 * 60 * 60;
                remainingTime.remainingHours = Math.floor((((timeSinceExpiry - remainingDaysInSeconds) / 60) / 60));
                let remainingHoursInSeconds = remainingTime.remainingHours * 60 * 60;
                remainingTime.remainingMinutes = Math.floor((timeSinceExpiry - remainingDaysInSeconds - remainingHoursInSeconds) / 60);

            } else {
                // Expired Bid
                if (biddingEvent.status !== this.STATUS_EXPIRED) {
                    biddingEvent.status = this.STATUS_EXPIRED;
                    remainingTime.biddingStatusChanged = true;
                }
            }
        } else {
            // Scheduled Bid
            if (biddingEvent.status !== this.STATUS_SCHEDULED) {
                biddingEvent.status = this.STATUS_SCHEDULED;
                remainingTime.biddingStatusChanged = true;
            }
            remainingTime.remainingDays = Math.floor((((timeSinceActivation / 60) / 60) / 24));
            let remainingDaysInSeconds = remainingTime.remainingDays * 24 * 60 * 60;
            remainingTime.remainingHours = Math.floor((((timeSinceActivation - remainingDaysInSeconds) / 60) / 60));
            let remainingHoursInSeconds = remainingTime.remainingHours * 60 * 60;
            remainingTime.remainingMinutes = Math.floor((timeSinceActivation - remainingDaysInSeconds - remainingHoursInSeconds) / 60);
        }
        return remainingTime;
    }

    public static validateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true);
        }
        return (false);
    }

    public static extractHostname(url: string): string {
        let hostname: string;
        //find & remove protocol (http, ftp, etc.) and get hostname

        if (url.indexOf("://") > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }

        //find & remove port number
        hostname = hostname.split(':')[0];
        //find & remove "?"
        hostname = hostname.split('?')[0];

        return hostname;
    }

    public static validateURL(url: string): boolean {
        var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
        if (!re.test(url)) {
            return false;
        }
        return true;
    }
}