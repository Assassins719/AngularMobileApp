export class Event {
    id: number;
    name: string; 
    production:string;
    lat: number;
    lon: number;
    date:Date;


    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    get DateString(): string {
        return this.date.toISOString().substring(0, 10);
        // console.log(new Date());
        // console.log(this.date);
        // console.log(this.location);
        // return "testing...";

    }
    
    // DateString(): string {
    //     console.log("event called");
    //     return this.date.toISOString().substring(0, 10);
    //     // console.log(new Date());
    //     // console.log(this.date);
    //     // console.log(this.location);
    //     // return "testing...";

    // }



}
