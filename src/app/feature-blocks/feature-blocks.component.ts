import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DraftersService } from '../drafters.service';
import { PlayerRankingsService } from '../player-rankings.service';

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

  constructor(public authService: AuthService, 
              public playerRankingsService: PlayerRankingsService, 
              public draftersService: DraftersService) { }

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
      this.createDashboardOverlayHidden = !this.createDashboardOverlayHidden;
    }
    else if(type == "names"){
      this.namesOverlayHidden = !this.namesOverlayHidden;
    }
    else if(type == "view"){
      this.viewDashboardOverlayHidden = !this.viewDashboardOverlayHidden;
    }

  }

  populatePickList(e: any){
    //refresh list
    this.playerPickList = [];
    this.model["names"] = {};
    var n = e;

    for(var i = 1; i <= n; i++){
      this.playerPickList.push(i);
      this.model["names"][i] = "";
    }

  }

  ngOnInit() {
  }

}
