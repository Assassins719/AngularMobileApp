export class EventFilter {
    date: Date;
    location: string;
    gpsLatitude: number;
    gpsLongitude: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    get Date(): string {
        return this.date.toISOString().substring(0, 10);
    }


}
