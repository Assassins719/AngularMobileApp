import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Location } from '@angular/common';
import { environment } from 'environments/environment';
import {ApiService} from "app/api-service"
const API_URL = environment.apiUrl;

import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  isNew = "create";
  strName = "";
  workId = -1;
  selectedWork: any;
  parts = [];
  authors = [];
  partIndex = -1;
  strPartBtn = "Add Part"
  strPartName = "";
  availableComposers = [];
  composerList = [];
  composers = [];
  dropdownSetting: any;
  artistId = -1;

  constructor(private zone: NgZone, public location: Location, private http: Http, private router: Router, private activatedRoute: ActivatedRoute, 
    private api: ApiService) {
    this.dropdownSetting = {
      enableSearch: true,
      checkedStyle: 'fontawesome',
      buttonClasses: 'btn btn-default btn-block',
      dynamicTitleMaxItems: 3,
      displayAllSelectedText: true
    };
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log("request");
      var artists_URL =
        this.http.get(API_URL + "/artists?traits=Composer")
          .map(response => {
            this.composerList = response.json().data;
            // this.composers = this.composerList;

            // this.composers = this.composerList;
            // this.composers = [
            //   { "id":0,"name": "aaa" }, {"id":1, "name": "bbb" }, { "id":2,"name": "ccc" }
            // ]

            // var temparray = [];
            // for (var i = 0; i < this.composerList.length; i++) {
            //   var temp = {id:i,name: this.composerList[i].name,index:this.composerList[i].id };
            //   temparray.push(temp);
            // }
            // this.composers = temparray;

            // console.log("Composers", this.composerList, this.composers);
          }).subscribe();

      this.isNew = params['new'];
      this.artistId = Number( params['artistid']) ;
      this.workId = params['id'];
      console.log("Parameters", this.artistId, this.workId, this.isNew);
      if (this.isNew == "create") {
        if (this.artistId>0){
          this.composers =[{"id":this.artistId,"name":"Unknown Artist (id="+this.artistId+")"}]
        }
      } else {

        //Get Work Data
        this.http.get(API_URL + "/works/" + this.workId)
          .map(response => {
            console.log("map", response.json());
            this.selectedWork = response.json();
            this.strName = this.selectedWork.name;
            this.parts = this.selectedWork.parts;
            this.composers = this.selectedWork.authors;
            // var temp = [];
            // for (var i = 0; i < this.selectedWork.authors.length; i++) {
            //   temp.push({id:this.selectedWork.authors[i].artist, name:this.selectedWork.authors[i].artistName});
            // }            
            var tempIndex = [];
            var tempComposer = []
            for (var i = 0; i < this.composers.length; i++) {
              tempIndex.push(this.composers[i].artist);
              tempComposer.push({id:this.composers[i].artiest,name:this.composers[i].artistName})
            }
            this.authors = tempIndex;
            this.composers = tempComposer;
            console.log("authorfirst", this.authors);
          }).subscribe();
      }
    });
  }
  selectPart(index) {
    if (this.partIndex == index) {
      this.partIndex = -1;
      this.strPartBtn = "Add Part"
    }
    else {
      this.partIndex = index;
      if (this.partIndex != -1) {
        this.strPartBtn = "Delete Part"
      }
    }
  }

  saveWork() {
    if (this.strName != "") {
      if (this.isNew == "create")//Create
      {       
        console.log(tempAuthours);
        this.selectedWork = {
          name: this.strName,
          parts: this.parts,
          authors: this.composers.map( value => { return {"artist":value.id,"role":"Composer"}})
        }
        console.log(JSON.stringify(this.selectedWork));

        return this.api.postObj("/works",this.selectedWork).map(response => {
            console.log(response);
            this.router.navigate(['/edit/artist', "edit", this.artistId]);
          }).subscribe();
      }
      else {//Update
        this.selectedWork.name = this.strName;
        this.selectedWork.parts = this.parts;
        var tempAuthours = [];
        for (var i = 0; i < this.authors.length; i++) {
          tempAuthours.push({ "artist": this.authors[i], "role": "Composer" });
        }
        this.selectedWork.authors = tempAuthours;
        return this.api.putObj('/works/' + this.selectedWork.id, this.selectedWork).map(response => {
          console.log(response);
          this.router.navigate(['/edit/artist', "edit", this.artistId]);
        }).subscribe();
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        // let url = API_URL + '/works/' + this.selectedWork.id;
        // console.log(this.selectedWork);
        // return this.http
        //   .put(url, JSON.stringify(this.selectedWork), { headers: headers })
        //   .map(response => {
        //     console.log(response);
        //     this.router.navigate(['/edit/artist', "edit", this.artistId]);
        //   }).subscribe();
      }
    }
  }

  public visiblePart = false;
  public visibleComposer = false;
  public visibleAnimate = false;

  public editPart(): void {
    if (this.partIndex == -1) {
      this.visiblePart = true;
      setTimeout(() => this.visibleAnimate = true, 100);
    } else {
      this.parts.splice(this.partIndex, 1);
      this.partIndex = -1;
      this.strPartBtn = "Add Part"
    }
  }
  addPart() {
    console.log(this.strPartName);
    if (this.strPartName != "") {
      this.zone.run(() => {
        this.parts.push({ name: this.strPartName });
        console.log(this.parts);
      });
    }
    this.strPartName = "";
    this.hide();
  }
  public editComposer() {
    this.visibleComposer = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }
  addComposer() {
    var temp = [];
    var index = 0;
    for (var i = 0; i < this.authors.length; i++) {
      for (var j = 0; j < this.composerList.length; j++) {
        if (this.authors[i] == this.composerList[j].id) {
          temp.push(this.composerList[j]);
        }
      }
    }
    this.composers = temp;
    this.hide();
  }
  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visiblePart = false, 300);
    this.visibleComposer = false;
    setTimeout(() => this.visibleComposer = false, 300);
    this.strPartName = "";
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
}
