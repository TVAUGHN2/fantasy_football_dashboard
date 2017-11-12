import { Injectable } from '@angular/core';
import { CURRENT_DASHBOARDS, CURRENT_DASHBOARDS_PLAYERS} from './data.model';
import { PlayerRankingsService } from './player-rankings.service';
import { Drafter } from './data.model';


@Injectable()
export class DashboardService {
  dashboards: {} = {username: {dashboardName: {drafters: [], profileDrafter: null}}};
  playerRankings: {} = {};

  constructor(public playerRankingsService: PlayerRankingsService) { 
    /* NEED TO CHANGE THE POPULATING OF DASHBOARD FROM THE DASHBOARD COMPONENT 
     * TO THIS DASHBOARD SERVICE. CURRENTLY THE COMPONENT IS USING THE MODEL.
     * CHANGE FROM MODEL TO THIS SERVICE.
    */

    var dbJson = JSON.parse(sessionStorage.getItem(CURRENT_DASHBOARDS));
    if(dbJson != null){
      this.dashboards = dbJson;
    }

    var prJson = JSON.parse(sessionStorage.getItem(CURRENT_DASHBOARDS_PLAYERS));
    if(prJson != null){
      this.playerRankings = prJson;
    }

  }

  addDashboard(username: string, dashboardName: string, dashboard: {}){
    /* Populate Dashboards */
    // check if this is the first dashboard being added
    if (this.dashboards[username] == null){
      var db = {};
      db[dashboardName] = dashboard;
      this.dashboards[username] = db;
    }
    else{
      this.dashboards[username][dashboardName] = dashboard;
    }
    //console.log(this.dashboards);


    //temporarily store
    sessionStorage.setItem(CURRENT_DASHBOARDS,JSON.stringify(this.dashboards));
  }

  updateDashboard(username: string, dashboardName: string, dashboard: {}){
    console.log("update dashboard")
    console.log(dashboard);
    this.addDashboard(username, dashboardName, dashboard);
    
    //username not has 0 player rankings
    /* Populate Player Rankings */
    var selected = [];
    var remaining = [];

    this.playerRankingsService.getSelected().forEach(ranking =>{
      selected.push(ranking);
    });

    this.playerRankingsService.getRemaining().forEach(ranking =>{
      remaining.push(ranking);
    });

    if (this.playerRankings[username] == null){
      var pr = {};
      pr[dashboardName] = {selected: selected, 
                          remaining: remaining};
      this.playerRankings[username] = pr;
    }
    else{
      this.playerRankings[username][dashboardName] = {selected: selected, 
                                                      remaining: remaining};
    }
    
    //temporarily store
    sessionStorage.setItem(CURRENT_DASHBOARDS,JSON.stringify(this.dashboards));
    sessionStorage.setItem(CURRENT_DASHBOARDS_PLAYERS,JSON.stringify(this.playerRankings));
    
  }

  removeDashboard(username: string, dashboardName: string){
    delete this.dashboards[username][dashboardName];

    //remove player rankings assoicated with the dashboard
    if(this.playerRankings[username] != null && this.playerRankings[username][dashboardName] != null){
        delete this.playerRankings[username][dashboardName];
    }

    //temporarily store
    sessionStorage.setItem(CURRENT_DASHBOARDS,JSON.stringify(this.dashboards));
    sessionStorage.setItem(CURRENT_DASHBOARDS_PLAYERS,JSON.stringify(this.playerRankings));
    
  }

  getDashboard(username: string, dashboardName: string): {}{
    return this.dashboards[username][dashboardName];
  }

  getDashboards(username): {}{
    return this.dashboards[username];
  }

  getDashboardRankings(username: string, dashboardName: string){
    return this.playerRankings[username][dashboardName];
  }
}
