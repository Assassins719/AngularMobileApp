import { Component, OnInit } from '@angular/core';
import { GlobalshareService } from '../../../globalshare.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { environment } from 'environments/environment';
const API_URL = environment.apiUrl;
import { ApiService } from "app/api-service"

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  selectedArtist: any;
  isNew = "create";//Creating New
  artistId = -1;
  strName = "";
  strUrl = "";
  workList = [];
  workIndex = -1;
  strWorkBtn = "Add Work";
  composers = [{ name: "Composer", checked: true }, { name: "Singer", checked: false }, { name: "Pianist", checked: false }];
  constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute, private globalService: GlobalshareService,
    private api: ApiService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.isNew = params['new'];
      if (this.isNew == "create") {
        this.strName = params['id'];
      } else if (this.isNew == "edit") {
        this.artistId = params['id'];
        //Get Venu Data
        this.http.get(API_URL + "/artists/" + this.artistId)
          .map(response => {
            this.selectedArtist = response.json();
            this.strName = this.selectedArtist.name;
            this.workList = this.selectedArtist.works;
            this.strUrl = this.selectedArtist.url;
            for (var i = 0; i < this.composers.length; i++) {
              for (var j = 0; j < this.selectedArtist.traits.length; j++) {
                if (this.composers[i].name == this.selectedArtist.traits[j]) {
                  this.composers[i].checked = true;
                  break;
                }
              }
            }
          }).subscribe();
      }
    });
  }
  selectWork(index) {
    if (this.workIndex == index) {
      this.workIndex = -1;
      this.strWorkBtn = "Add Work"
    }
    else {
      this.workIndex = index;
      if (this.workIndex != -1) {
        this.strWorkBtn = "Edit Work"
      }
    }
  }
  updateWorks() {
    if (this.isNew != "create") {//update
      this.selectedArtist.name = this.strName;
      this.selectedArtist.traits = [];
      for (var i = 0; i < this.composers.length; i++) {
        if (this.composers[i].checked) {
          this.selectedArtist.traits.push(this.composers[i].name);
        }
      }
      this.selectedArtist.url = this.strUrl;
      return this.api.putObj('/artists/' + this.artistId, this.selectedArtist).map(response => {
        this.artistId = response.json().id;
        if (this.workIndex != -1) {
          this.router.navigate(['/edit/works', "edit", this.workList[this.workIndex].id, this.artistId]);
        }
        else {
          this.router.navigate(['/edit/works', "create", "none", this.artistId]);
        }
      }).subscribe();
    } else {
      var traitTemp = [];
      for (var i = 0; i < this.composers.length; i++) {
        if (this.composers[i].checked) {
          traitTemp.push(this.composers[i].name);
        }
      }
      this.selectedArtist = {
        name: this.strName,
        traits: traitTemp,
        works: this.workList,
        url: this.strUrl
      }
      return this.api.postObj('/artists/', this.selectedArtist).map(response => {
        this.artistId = response.json().id;
        if (this.workIndex != -1) {
          this.router.navigate(['/edit/works', "edit", this.workList[this.workIndex].id, this.artistId]);
        }
        else {
          this.router.navigate(['/edit/works', "create", "none", this.artistId]);
        }
      }).subscribe();
    }
  }
  saveArtist() {
    if (this.isNew != "create") {//update
      this.selectedArtist.name = this.strName;
      this.selectedArtist.traits = [];
      for (var i = 0; i < this.composers.length; i++) {
        if (this.composers[i].checked) {
          this.selectedArtist.traits.push(this.composers[i].name);
        }
      }
      this.selectedArtist.url = this.strUrl;
      return this.api.putObj('/artists/' + this.artistId, this.selectedArtist).map(response => {
        this.artistId = response.json().id;
        if (this.workIndex != -1) {
          this.router.navigate(['/edit/works', "edit", this.workList[this.workIndex].id, this.artistId]);
        }
        else {
          this.router.navigate(['/edit/works', "create", "none", this.artistId]);
        }
      }).subscribe();
    } else {
      var traitTemp = [];
      for (var i = 0; i < this.composers.length; i++) {
        if (this.composers[i].checked) {
          traitTemp.push(this.composers[i].name);
        }
      }
      this.selectedArtist = {
        name: this.strName,
        traits: traitTemp,
        works: this.workList,
        url: this.strUrl
      }
      return this.api.postObj('/artists/', this.selectedArtist).map(response => {
        this.artistId = response.json().id;
        if (this.workIndex != -1) {
          this.router.navigate(['/edit/works', "edit", this.workList[this.workIndex].id, this.artistId]);
        }
        else {
          this.router.navigate(['/edit/works', "create", "none", this.artistId]);
        }
      }).subscribe();
    }
  }
  ngOnDestroy() {
    console.log("destroy");
  }
}
