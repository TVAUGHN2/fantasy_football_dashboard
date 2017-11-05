import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DraftersService } from '../drafters.service';
import { PlayerRankingsService } from '../player-rankings.service';
import { CURRENT_MODEL } from '../data.model';

@Component({
  selector: 'app-feature-blocks',
  templateUrl: './feature-blocks.component.html',
  styleUrls: ['./feature-blocks.component.css']
})
export class FeatureBlocksComponent implements OnInit {
  createDashboardOverlayHidden: boolean = true;
  namesOverlayHidden: boolean = true;
  viewDashboardOverlayHidden: boolean = true;

  model: {} = {dashboardName: "", numDrafters: 0, profilePick: 0, names: {}};
  totalNumList: number[] = [4,6,8,10,12,14];
  playerPickList: number[] = [];

  constructor(public authService: AuthService, public playerRankingsService: PlayerRankingsService, public draftersService: DraftersService) { 
    var json = JSON.parse(sessionStorage.getItem(CURRENT_MODEL));
    
    if(json != null)  {this.model = json;}
  }

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
        //clear selected list when a new dashboard is create
        this.playerRankingsService.clearSelected();
        console.log(this.playerRankingsService.getSelected());

        this.draftersService.setDrafters(this.model["dashboardName"], this.model["names"], this.model["profilePick"]);
        sessionStorage.setItem(CURRENT_MODEL, JSON.stringify(this.model));
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
    console.log("view hidden before= " + this.viewDashboardOverlayHidden);
    if(type == "questions"){
      this.createDashboardOverlayHidden = !this.createDashboardOverlayHidden;
    }
    else if(type == "names"){

      this.namesOverlayHidden = !this.namesOverlayHidden;
    }
    else if(type == "view"){
      console.log("in view else if condition");
      this.viewDashboardOverlayHidden = !this.viewDashboardOverlayHidden;
    }
    console.log("view hidden after= " + this.viewDashboardOverlayHidden);
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
  }

}
