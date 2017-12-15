
import { Component, OnInit, NgZone, ApplicationRef, ElementRef } from '@angular/core';
import { EventDataService } from '../../event-data-service';
import { Event } from '../../models';
import { EventFilter } from './models';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { ApiService } from '../../api-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.css'],
  providers: []
})

export class EventFilterComponent implements OnInit {


  events: Event[] = [];
  withinDistance: number = 400; //filter all events within 400 km from selected location

  constructor(private eventDataService: EventDataService,
    private zone: NgZone, private appref: ApplicationRef, private mapsAPILoader: MapsAPILoader, private apiService: ApiService, private router: Router
  ) {
  }

  public ngOnInit() {

  }

  // onFilterResult(eventFilter: EventFilter) {
  //   this.eventDataService
  //     .getNearByEvents(eventFilter.gpsLatitude, eventFilter.gpsLongitude, this.withinDistance)
  //     .subscribe(
  //     (events) => {

  //       console.log(eventFilter.location + " lat:" + eventFilter.gpsLatitude + " long" + eventFilter.gpsLongitude);
  //       // console.log("appComp" + events.length);
  //       this.zone.run(() => {
  //         this.events = events;

  //       });
  //     }
  //     );

  // }

  onFilterResult(eventFilter: EventFilter) {

    let { gpsLatitude, gpsLongitude } = eventFilter;

    this.router.navigate(['/filter/event-filter', { gpsLatitude: gpsLatitude, gpsLongitude: gpsLongitude }]);

  }

}


