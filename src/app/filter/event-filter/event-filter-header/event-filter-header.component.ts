import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { EventFilter } from '../models';
@Component({
  selector: 'app-event-filter-header',
  templateUrl: './event-filter-header.component.html',
  styleUrls: ['./event-filter-header.component.css']
})

export class EventFilterHeaderComponent implements OnInit {

  eventFilter: EventFilter;


  adress: string = "";

  public options = { types: ['address'], componentRestrictions: { country: 'FR' } }


  @Output()
  filter: EventEmitter<EventFilter> = new EventEmitter();

  constructor(private zone: NgZone) {
    this.eventFilter = new EventFilter({ date: new Date(), location: "" });

  }


  ngOnInit() {

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    // }
    // else
    //   console.log("navigator.geolocation not supported by this browser!");

    // this.filter.emit(this.eventFilter);
  }

  setPosition(position) {

    this.eventFilter.gpsLatitude = position.coords.latitude;
    this.eventFilter.gpsLongitude = position.coords.longitude;


    console.log("Latitude: " + this.eventFilter.gpsLatitude + "  Longitude: " + this.eventFilter.gpsLongitude);

    this.filter.emit(this.eventFilter);


  }

  onEnter() {

    console.log("test");

    //if location="" then get users current position
    if (this.eventFilter.location == "") {
      console.log(this.eventFilter.location);

      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
      }
      else
        console.log("navigator.geolocation not supported by this browser!");
    }

  }

  getAddress(place) {
    console.log("Address", place);

    this.eventFilter.location = place.formatted_address;


    // console.log("lat: "+place.geometry.location.lat());
    console.log(this.eventFilter.location);
    this.eventFilter.gpsLatitude = place.geometry.location.lat();
    this.eventFilter.gpsLongitude = place.geometry.location.lng();

    this.filter.emit(this.eventFilter);

  }

  filterResult() {

    this.filter.emit(this.eventFilter);
    // console.log("event-filter-header: "+this.eventFilter.location);

    // this.zone.run(() => {
    //   this.filter.emit(this.eventFilter);
    //   console.log(this.eventFilter.location);
    // });


  }


}
