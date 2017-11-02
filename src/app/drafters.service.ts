import { Injectable } from '@angular/core';
import { Drafter } from './data.model';

@Injectable()
export class DraftersService {
  drafters: Drafter[] = [];
  profileDrafter: Drafter;
  constructor() {}

  setDrafters(drafterMaps: {}, profileNum: number){
    this.drafters = [];
    for (var draftPick in drafterMaps){
      var drafter = new Drafter(drafterMaps[draftPick], parseInt(draftPick), false); 
      if(parseInt(draftPick) == profileNum){
        drafter["isProfile"] = true;
        this.profileDrafter = drafter;
      }
      this.drafters.push(drafter);
    }

    //since not guaranteed keys will be in order by draft pick. sort to confirm.
    this.drafters.sort(function(a, b){
      return a["draftPosition"] - b["draftPosition"];
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
