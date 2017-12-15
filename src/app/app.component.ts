import { Component, OnInit, NgZone, ApplicationRef, ElementRef } from '@angular/core';
import { MapsAPILoader } from 'angular2-google-maps/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []

})
export class AppComponent implements OnInit {




  constructor(
    private zone: NgZone, private appref: ApplicationRef, private mapsAPILoader: MapsAPILoader
  ) {
  }

  public ngOnInit() {

  }

}