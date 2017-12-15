import { Injectable } from '@angular/core';

@Injectable()
export class GlobalshareService {
  tempArtist:any = null;
  constructor() { }
  getTempArtist(){
    return this.tempArtist;
  }
  setTempArtist(tempArt){
    this.tempArtist = tempArt;
  }
}
