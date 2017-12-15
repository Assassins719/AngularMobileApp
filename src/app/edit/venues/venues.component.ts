import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Router } from '@angular/router';

import { environment } from 'environments/environment';

const API_URL = environment.apiUrl;
@Component({
  selector: 'app-venue',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenuesComponent implements OnInit {
  venuesList: any;
  venues: any;
  ngFilter = "";
  index = -1;
  strBtn = "Add Venue";
  constructor(private http: Http, private router: Router) {

  }
  ngOnInit() {
    console.log("request");
    this.http.get(API_URL + "/venues")
      .map(response => {
        console.log("map");
        this.venuesList = response.json().data;
        this.venues = this.venuesList;
        console.log(this.venuesList, this.venuesList.length)
      }).subscribe();
  }
  onChange(filter) {
    this.venues = [];
    for (var i = 0; i < this.venuesList.length; i++) {
      if (this.venuesList[i].name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
        this.venues.push(this.venuesList[i]);
    }
    if (this.venues.length == 0) {
      this.index = -1;
      this.strBtn = "Add Venue";
    }
  }
  selectVenue(index) {
    this.ngFilter = this.venues[index].name;
    if (this.index == index) {
      this.index = -1;
      this.strBtn = "Add Venue";
      this.ngFilter = "";
    }
    else {
      this.index = index;
      if (this.index != -1) {
        this.strBtn = "Edit Venue"
      }
    }
  }
  gotoVenue() {
    console.log(this.index);
    if (this.index != -1) {
      this.router.navigate(['/edit/venue', "edit", this.venues[this.index].id]); //Editing
      return;
    }
    else {
      if (this.ngFilter != "") {
        this.router.navigate(['/edit/venue', "create", this.ngFilter]); //Creating
        return;
      }
    }
  }
}
