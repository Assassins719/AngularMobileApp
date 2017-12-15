import { Component, OnInit } from '@angular/core';
import { DropdownModule } from "ng2-dropdown";
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
const API_URL = environment.apiUrl;
@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  artists: any;
  artistList=[];
  ngFilter = "";
  ngTrait = "";
  index = -1;
  strBtn = "Add Artist"
  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    console.log("request");
    var artists_URL =
      this.http.get(API_URL + "/artists")
        .map(response => {
          console.log("map");
          this.artistList = response.json().data;
          this.artists = this.artistList;
          console.log(this.artists, this.artistList.length)
        }).subscribe();
  }
  onChange(filter) {
    this.ngFilter = filter;
    this.filterData();
  }
  onSelected(selected) {
    if (selected == "All") {
      this.ngTrait = "";
    }
    else {
      this.ngTrait = selected;
    }
    this.filterData();
  }
  filterData() {
    this.artists = [];
    for (var i = 0; i < this.artistList.length; i++) {
      if (this.artistList[i].name.toLowerCase().indexOf(this.ngFilter.toLowerCase()) !== -1) {
        if (this.ngTrait == "") { this.artists.push(this.artistList[i]); }
        else {
          if (this.artistList[i].traits.length == 0) {

          } else {
            if (this.artistList[i].traits.indexOf(this.ngTrait) != -1) {
              this.artists.push(this.artistList[i]);
            } else {
            }
          }
        }
      }
    }
    if (this.artists.length == 0) {
      this.index = -1;
      this.strBtn = "Add Artist";
    }
  }
  selectArtist(index) {
    this.ngFilter = this.artists[index].name;
    if (this.index == index) {
      this.index = -1;
      this.strBtn = "Add Artist";
      this.ngFilter = "";
    }
    else {
      this.index = index;
      if (this.index != -1) {
        this.strBtn = "Edit Artist"
      }
    }
  }
  gotoArtist() {
    if (this.index != -1) {
      this.router.navigate(['/edit/artist', "edit", this.artists[this.index].id]);
    }
    else {
      if (this.ngFilter != "") {
        this.router.navigate(['/edit/artist', "create", this.ngFilter]);
      }
    }
  }
}
