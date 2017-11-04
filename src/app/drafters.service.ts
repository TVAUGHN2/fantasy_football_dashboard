import { Injectable } from '@angular/core';
import { 
  Drafter, 
  CURRENT_DRAFTERS, 
  CURRENT_PROFILE_DRAFTER
} from './data.model';

@Injectable()
export class DraftersService {
  drafters: Drafter[] = [];
  profileDrafter: Drafter;
  constructor() {
    //check if anything is cached and if so use it to reinstate drafters
    var draftersJson = JSON.parse(sessionStorage.getItem(CURRENT_DRAFTERS));
    if(draftersJson != null){
      draftersJson.forEach(item => {
        this.drafters.push(new Drafter(item["name"], 
                                       item["draftPosition"], 
                                       item["isProfile"], 
                                       item["picks"]));
      });
    }

    //check if anything is cached and if so use it to reinstate profile drafter
    var profileJSON = JSON.parse(sessionStorage.getItem(CURRENT_PROFILE_DRAFTER));
    if(profileJSON != null){
      this.profileDrafter = new Drafter(profileJSON["name"], 
                                        profileJSON["draftPosition"], 
                                        profileJSON["isProfile"], 
                                        profileJSON["picks"])
    }
  }

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

    //save in case of browser refresh
    sessionStorage.setItem(CURRENT_DRAFTERS, JSON.stringify(this.drafters));
    sessionStorage.setItem(CURRENT_PROFILE_DRAFTER, JSON.stringify(this.profileDrafter));
  }

  getDrafters(){
    return this.drafters;
  }

  clearpicks(){
    this.drafters.forEach(drafter=>{
      for(var pick in drafter["picks"]){
        drafter["picks"][pick]["player"] = {firstName: "", lastName: "", position: "", teamAbbr: "", bye: ""};
      }
    });
  }

  //assumes an ordered list is entered
  updateDraftPicks(selectedPicks: {}[]){
    //clear picks in case any players have been removed
    this.clearpicks();

    this.updateSnake(selectedPicks);

    //save in case of browser refresh
    sessionStorage.setItem(CURRENT_DRAFTERS, JSON.stringify(this.drafters));
    sessionStorage.setItem(CURRENT_PROFILE_DRAFTER, JSON.stringify(this.profileDrafter));

    //future cases add other methods (auction drafts for instance
  }

  updateSnake(selectedPicks: {}[]){
    var n = this.drafters.length;
    var round = 0;

    for (var pick = 0; pick < selectedPicks.length; pick++){
      //NEED CODE TO FLIP ISSNAKEBACK
      if (pick % n == 0) {round++;}


      //odd number rounds are normal
      if (round % 2 == 1){
        this.drafters[pick % n].picks[round - 1]["player"] = selectedPicks[pick];
      }

      //even number rounds are snakeback
      else{
        this.drafters[n - 1 - (pick % n)].picks[round - 1]["player"] = selectedPicks[pick];
      }
    }
  }

  getProfileDrafter(): Drafter{
    return this.profileDrafter;
  }

}
