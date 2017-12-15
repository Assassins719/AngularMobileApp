import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Event } from '../models';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) {
  }

  distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") { dist = dist * 1.609344; }
    if (unit == "N") { dist = dist * 0.8684; }
    return dist;
  }

  public testGetLocations(location: string) {
    let headers = new Headers({ 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=st&types=(cities)&key=AIzaSyCeFnIJ1t8ySe6tmH0sxNXfLTFbPSnrcgc", options)
      .map(response => {
        const locationsObject = response.json();
        const cities = locationsObject.predictions.map((prediction) => {
          return prediction.description;
        });
        console.log(cities);

      }).subscribe();

  }

  public getEvent(id: string): Observable<Event> {

    return this.http
      .get(API_URL + '/events/' + id)
      .map(response => {
        const event = response.json();
        return new Event({
          id: event.id,
          name: event.name,
          production: event.production,
          lat: event.lat,
          lon: event.lon
        });

      })
      ._catch(this.handleError);
  }

  public getEvents(queryString: string): Observable<Event[]> {
    return this.http
      .get(API_URL + '/events?' + queryString)
      .map(response => {
        const events = response.json();
        return events.map((event) => new Event({
          id: event.id,
          title: event.title,
          genre: event.genre,
          author: event.author,
          venue: event.venue,
          date: new Date(event.date)
        }));
      })
      .catch(this.handleError);
  }

  public getAllEvents(): Observable<Event[]> {
    return this.http
      .get(API_URL + '/events')
      .map(response => {
        const events = response.json();
        return events.map((event) => new Event({ location: event.location, date: new Date(event.date) }));
      })
      .catch(this.handleError);
  }

  public getNearByEvents(gpsLatitude: number, gpsLongitude: number, withinDistance: number): Observable<Event[]> {

    let url = API_URL + `/events?location=${gpsLatitude},${gpsLongitude}`;

    return this.http
      .get(API_URL + `/events?location=${gpsLatitude},${gpsLongitude}`)
      .map(response => {
        const events = response.json();
        return events.map((event) => new Event({
          id: event.id,
          name: event.name,
          production: event.production,
          lat: event.lat,
          lon: event.lon
        }));
      })
      .catch(this.handleError);
  }

  //adds an event db events table
  public addEvent(event: Event): Observable<Event> {
    let headers: Headers = new Headers();
    headers.append('Authorization', 'Basic YWI6YWI=');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ method: RequestMethod.Post, headers: headers });


    return this.http
      .post(API_URL + '/events', {
        name:event.name,
        lat:event.lat,
        lon:event.lon,
        date:event.date.toISOString(),
        prodId:1
      }
      )
//  .post(API_URL + '/events', {
//         name:"SamuelTestProd",
//         date:"2017-07-18T00:22:06+0200",
//         lat:10,
//         lon:10,
//         prodId:1
//       })
     
      .catch(this.handleError);

  }


  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

  public postObj(url: String,body: any): Observable<Response>{
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(API_URL + url,JSON.stringify(body), {headers: headers});
  }
  public putObj(url: String,body: any): Observable<Response>{
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(API_URL + url,JSON.stringify(body), {headers: headers});
  }
}
