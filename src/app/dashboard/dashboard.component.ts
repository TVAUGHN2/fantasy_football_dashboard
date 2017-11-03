import { Component, OnInit, Input } from '@angular/core';
import { DraftersService } from '../drafters.service';
import { PlayerRankingsService } from '../player-rankings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  overlayHidden: boolean = true;
  totalNumList: number[] = [4,6,8,10,12,14];
  playerPickList: number[] = [];
  namesOverlayHidden: boolean = true;
  model: {} = {numDrafters: 0, profilePick: 0, names: {}};

  submitted = false;
  
  constructor(public playerRankingsService: PlayerRankingsService, public draftersService: DraftersService) { }

  onSubmit(type: string) { 
    if(this.model["numDrafters"] == 0){
      alert("Please enter the number of people drafting.");
      this.clear();
    }
    else if(this.model["profilePick"] == 0){
      alert("Please enter your draft pick.");
      this.clear();
    }
    else{ //valid entries
      this.changeOverlay(type);
      if(type == "questions"){
        this.changeOverlay("names"); //unhide names form
      }
      //creating dashboard
      else if (type == "names"){
        this.draftersService.setDrafters(this.model["names"], this.model["profilePick"]);
      }
    }
      
  } 
  onCancel(type: string) { 
    this.changeOverlay(type); 
    this.clear();

    if(type == "names"){
      this.changeOverlay("questions"); //go back to questions form;
    }
  }

  clear(){
    this.playerPickList = [];
    this.model["numDrafters"] = 0;
    this.model["profilePick"] = 0;
    this.model["names"] = {};
  }
  

  changeOverlay(type: string) {
    if(type == "questions"){
      this.overlayHidden = !this.overlayHidden;
    }
    else if(type == "names"){
      this.namesOverlayHidden = !this.namesOverlayHidden;
    }
    
  }

  populatePickList(e: any){
    //refresh list
    this.playerPickList = [];
    var n = e;
    for(var i = 1; i <= n; i++){
      this.playerPickList.push(i);
      this.model["names"][i] = "";
    }
  }

  ngOnInit() {
    //only try and get players if a dashboard has been created
    if(this.draftersService.drafters.length > 0){
      this.draftersService.updateDraftPicks(this.playerRankingsService.getSelected());
    }
  }

  
}

var drafterMaps = [
  {name: "Travis", isProfile: true},
  {name: "Jeremy", isProfile: false},
  {name: "Tom", isProfile: false},
  {name: "Ryler", isProfile: false},
  {name: "Dan", isProfile: false},
  {name: "The U", isProfile: false},
  {name: "Titak", isProfile: false},
  {name: "Goody", isProfile: false},
]