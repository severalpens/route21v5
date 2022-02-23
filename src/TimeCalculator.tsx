import timetables from "./timetables";

export default class TimeCalculator {
    date: any;
    today: any;
    midnight: any;
    tomorrow: any;
    midnightTonight: any;
    locationId: number;
    directionId: number;

    constructor(){
        this.locationId = -1;
        this.directionId =-1;
    }



    getMidnight() {
        let date  = new Date();
        date.setHours(0, 0, 0, 0);
        return date.getTime() / 1000;
    }


    setTimetable(dayId: number, locationId: number, directionId: number) {
        return timetables.filter(x => x.dayId === dayId && x.locationId === locationId && x.directionId === directionId);
    }


    getEpochSeconds() {
        let now = Math.floor(this.date.getTime() / 1000);
        return now;
    }


    getNextTimetableSeconds() {
        let timesRemainingToday = this.today.filter((t: { secondsFromMidnight: any; }) => {
            let tEpochSeconds = this.midnight + t.secondsFromMidnight;
            return tEpochSeconds > Math.floor(this.date.getTime() / 1000);;
        });

        return  timesRemainingToday[0] ? this.midnight + timesRemainingToday[0].secondsFromMidnight : this.midnight + (24 * 60 * 60) + this.tomorrow[0].secondsFromMidnight;

    }

    
getFormattedTime(s: number) {
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
  
    return hrs ? hrs + ':' + mins + ':' + secs : hrs + ':' + mins + ':' + secs ;
  }
  


    secondsTilNext() {
        let nextTimetableSecondsFromMidnight = this.getNextTimetableSeconds();
        let nextEpochSeconds = this.midnightTonight + nextTimetableSecondsFromMidnight;
        let nowEpochSeconds = Math.floor(this.date.getTime() / 1000);
        return nextEpochSeconds - nowEpochSeconds;
    }

    next(locationId: number, directionId: number) {
        this.date = new Date();
        this.midnight = this.getMidnight();
        this.locationId = locationId;
        this.directionId = directionId;

        
        switch (new Date().getDay()) {
            case 5:
                this.today = this.setTimetable(1, this.locationId, this.directionId);
                this.tomorrow = this.setTimetable(6, this.locationId, this.directionId);
                break;

            case 6:
                this.today = this.setTimetable(6, this.locationId, this.directionId);
                this.tomorrow = this.setTimetable(0, this.locationId, this.directionId);
                break;

            case 0:
                this.today = this.setTimetable(0, this.locationId, this.directionId);
                this.tomorrow = this.setTimetable(1, this.locationId, this.directionId);
                break;

            default:
                this.today = this.setTimetable(1, this.locationId, this.directionId);
                this.tomorrow = this.setTimetable(1, this.locationId, this.directionId);
                break;
        }

        let nowEpochSeconds = Math.floor(this.date.getTime() / 1000);
        let s = this.getNextTimetableSeconds() - nowEpochSeconds;
        return this.getFormattedTime(s);
    }

}