import { Injectable } from '@angular/core';
import { Event } from '../models';
import { ApiService } from '../api-service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventDataService {

  constructor(private api: ApiService) { }

  getAllEvents(): Observable<Event[]> {
    return this.api.getAllEvents();
  }

  public getEvent(id: string): Observable<Event>
  {
    return this.api.getEvent(id);
  }

  getEvents(queryString: string) {
    return this.api.getEvents(queryString);
  }

  getNearByEvents(gpsLatitude: number, gpsLongitude: number, withinDistance: number): Observable<Event[]> {
    return this.api.getNearByEvents(gpsLatitude, gpsLongitude, withinDistance);
  }

  addEvent(event:Event):Observable<Event>{
   return this.api.addEvent(event);
  }

}
