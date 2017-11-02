import { Injectable } from '@angular/core';
import { Drafter } from './data.model';

@Injectable()
export class DraftersService {
  drafters: Drafter[] = [];
  profileDrafter: Drafter;
  constructor(drafterMaps: {}[]) {
    //DRAFTER MAP SHOULD BE A MAP WITH TWO KEYS: "name" & "isProfile"
    var count = 0;
    drafterMaps.forEach(drafter => {
      var tmpDrafter = new Drafter(drafter["name"],++count, drafter["isProfile"]);

      //set profile player
      if(drafter["isProfile"] == true){
        this.profileDrafter = tmpDrafter;
      }

      //load drafter list
      this.drafters.push(tmpDrafter);
    });

  }

  getDrafters(){
    return this.drafters;
  }

  updateDraftPicks(name: string, picks: {}[]){
    this.drafters.forEach(drafter => {
      if(drafter.name == name){
        drafter.picks = picks;
      }
    });
  }

  getProfileDrafter(): Drafter{
    return this.profileDrafter;
  }

}
