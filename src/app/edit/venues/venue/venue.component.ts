import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Location } from '@angular/common';
import { environment } from 'environments/environment';
import { ApiService } from "app/api-service"
const API_URL = environment.apiUrl;
declare var google: any;
@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})
export class VenueComponent implements OnInit {
  selectedVenue: any;
  strName = "";
  strUrl = "";
  strAddress = "";
  lat: number = 0;
  lng: number = 0;
  isNew = "create";//Creating New
  venueId = -1;
  map: any;
  marker: any;
  constructor(private http: Http, private zone: NgZone, private activatedRoute: ActivatedRoute, public api: ApiService, public location: Location) {
  }
  mapInit() {
    var my_position = new google.maps.LatLng(this.lat, this.lng);
    this.map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: my_position,
      zoom: 15,
      disableDoubleClickZoom: true
    });
    this.marker = new google.maps.Marker({
      position: my_position,
      map: this.map
    });
    console.log(this.marker);
    // double click event
    var self = this;
    google.maps.event.addListener(this.map, 'dblclick', function (e) {
      var positionDoubleclick = e.latLng;
      self.marker.setPosition(positionDoubleclick);
      self.zone.run(() => {
        self.lat = positionDoubleclick.lat();
        self.lng = positionDoubleclick.lng();
        console.log(self.lat, self.lng);
      });
    });
  }
  ngOnInit() {
    this.mapInit();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.isNew = params['new'];
      if (this.isNew == "create") {
        this.strName = params['id'];
      } else {
        this.venueId = params['id'];
        //Get Venue Data
        this.http.get(API_URL + "/venues/" + this.venueId)
          .map(response => {
            this.selectedVenue = response.json();
            this.strName = this.selectedVenue.name;
            this.strUrl = this.selectedVenue.url;
            this.zone.run(() => {
              this.lat = this.selectedVenue.lat;
              this.lng = this.selectedVenue.lon;
              let latlng = new google.maps.LatLng(this.lat, this.lng);
              this.marker.setPosition(latlng);
              this.map.setCenter(latlng);
            });
            this.getAddressFromLatLng();
          }).subscribe();
      }
    });
  }

  getAddressFromLatLng() {  //Get String address from lat lng.
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(this.lat, this.lng);
    let request = { latLng: latlng };
    geocoder.geocode(request, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        let result = results[0];
        this.zone.run(() => {
          this.strAddress = result.formatted_address;
        });
      }
    });
  }

  saveVenue() {
    if (this.isNew != "create") { //Edit existing Venue
      this.selectedVenue.name = this.strName;
      this.selectedVenue.lat = this.lat;
      this.selectedVenue.lon = this.lng;
      this.selectedVenue.url = this.strUrl;
      return this.api.putObj('/venues/' + this.venueId, this.selectedVenue).map(response => {
        this.location.back(); //Go to venues page
      }).subscribe();
    } else {  //Create  new Venue
      this.selectedVenue = {
        name: this.strName,
        lat: this.lat,
        lon: this.lng,
        url: this.strUrl
      }
      return this.api.postObj('/venues/1', this.selectedVenue).map(response => {
        this.location.back(); ///Go to venues page
      }).subscribe();
    }
  }

  getAddress(place) {   //Get Address(Lat, Lng) from address string and set map and marker in the center
    this.zone.run(() => {
      console.log("Address", place);
      this.lat = place.geometry.location.lat();
      this.lng = place.geometry.location.lng();
      this.map.setCenter(place.geometry.location);
      this.marker.setPosition(place.geometry.location);
      console.log(this.lat, this.lng);
    });
  }
}
