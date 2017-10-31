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

    //temporary to test
    for (var i = 0; i < this.drafters.length; i++){
      //temporary to test out
      this.drafters[i].picks.forEach(pick =>{
        pick["name"] = "Jerrick Mckinnion";
        pick["bye"] = 6;
        pick["position"] = "RB";
      });
    }

    
  }

  getDrafters(){
    return this.drafters;
  }

  getProfileDrafter(): Drafter{
    return this.profileDrafter;
  }

}
