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

  //assumes an ordered list is entered
  updateDraftPicks(selectedPicks: {}[]){
    this.updateSnake(selectedPicks);
    
    //future cases add other methods (auction drafts for instance
  }

  updateSnake(selectedPicks: {}[]){
    var n = this.drafters.length;
    var round = 0;

    console.log("in updateSnake");
    for (var pick = 0; pick < selectedPicks.length; pick++){
      //NEED CODE TO FLIP ISSNAKEBACK
      if (pick % n == 0) {round++;}

      console.log("round: " + round);

      //odd number rounds are normal
      if (round % 2 == 1){
        this.drafters[pick % n].picks[round - 1]["player"] = selectedPicks[pick];
      }

      //even number rounds are snakeback
      else{
        console.log("n - (pick % n): " + (n - (pick % n)));
        this.drafters[n - 1 - (pick % n)].picks[round - 1]["player"] = selectedPicks[pick];
      }
    }
  }

  getProfileDrafter(): Drafter{
    return this.profileDrafter;
  }

}
