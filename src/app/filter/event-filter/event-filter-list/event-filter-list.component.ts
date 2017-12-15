import { Component, OnInit, Input, OnChanges, SimpleChanges, NgZone } from '@angular/core';
import { Event } from '../../../models';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { EventDataService } from '../../../event-data-service';
import { NavigationEnd } from '@angular/router';



@Component({
  selector: 'app-event-filter-list',
  templateUrl: './event-filter-list.component.html',
  styleUrls: ['./event-filter-list.component.css']
})
export class EventFilterListComponent implements OnInit, OnChanges {


  events: Event[];

  constructor(private route: ActivatedRoute,
    private router: Router, private eventDataService: EventDataService, private zone: NgZone) {
      this.router.events.subscribe(this.getEvents.bind(this));
     }

  // ngOnInit() {
  //   console.log("event-list-comp...");
  //   console.log(this.route);

  //   let test:Observable<number>= this.route.paramMap
  //     .switchMap((params: ParamMap) => {
  //       // (+) before `params.get()` turns the string into a number
  //       let gpsLatitude: number = +params.get('gpsLatitude');
  //       let gpsLongitude: number = +params.get('gpsLongitude');
  //       console.log("event-list-comp-switchmap");
  //       // console.log('event-filter-list-comp:  gpsLatitude ${gpsLatitude} gpsLongitude ${gpsLongitude}');

  //       this.eventDataService
  //         .getNearByEvents(gpsLatitude, gpsLongitude, 400)
  //         .subscribe(
  //         (events) => {

  //           // console.log(eventFilter.location + " lat:" + eventFilter.gpsLatitude + " long" + eventFilter.gpsLongitude);
  //           // console.log("appComp" + events.length);
  //           this.zone.run(() => {
  //             this.events = events;

  //           });
  //         }
  //         );
  //       return new Observable<number>();

  //       // return new Observable<number>();
  //     });

  // }

getEvents(event){
console.log("getevents");
 if(event instanceof NavigationEnd) {

 // (+) before `params.get()` turns the string into a number
        let gpsLatitude: number = +this.route.snapshot.params.gpsLatitude;
        let gpsLongitude: number = +this.route.snapshot.params.gpsLongitude;
        console.log("event-list-comp-switchmap");
        // console.log('event-filter-list-comp:  gpsLatitude ${gpsLatitude} gpsLongitude ${gpsLongitude}');

        this.eventDataService
          .getNearByEvents(gpsLatitude, gpsLongitude, 400)
          .subscribe(
          ((events) => {

            // console.log(eventFilter.location + " lat:" + eventFilter.gpsLatitude + " long" + eventFilter.gpsLongitude);
            // console.log("appComp" + events.length);
            this.zone.run((() => {
              this.events = events;

            }).bind(this));


           
          }).bind(this)
          );
      
 }
}

 ngOnInit() {
    console.log("event-list-comp...");
    console.log(this.route);

    
       
        // return new Observable<number>();
     

  }


  ngOnChanges(changes: SimpleChanges) {
    // console.log("event-filter-list: "+this.events.length);
  }

}
