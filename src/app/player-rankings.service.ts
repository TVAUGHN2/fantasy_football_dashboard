import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ByeWeekService } from './bye-week.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlayerRankingsService {
  
  private nflEditorRankingsURL = "http://api.fantasy.nfl.com/v1/players/editordraftranks?format=json&count=100";


  //creating variables for optimization purposes so don't have to keep filtering and slicing everytime
  modifiableResults: {}[] = []; overallResults: {}[] = []; 
  wrResults: {}[] = []; rbResults: {}[] = []; qbResults: {}[] = []; 
  teResults: {}[] = []; defResults: {}[] = []; kResults: {}[] = []; 
  selectedPlayers: {}[] = [];
  selectedPlayersIndiv: {}[] = []; //to track where to add back

  private resultMappings: {} = {};
  private byes: {} = {}

  constructor(private http: Http, private byeWeekService: ByeWeekService) {
    
    this.byeWeekService.search(); //ensure this variable is populated
    this.byes = this.byeWeekService.getByeWeeks();
    //this.search();
  }

  search(): Promise<any>{
    this.overallResults = [];
    //return 1000 player rankings
      let promise = new Promise((resolve, reject) => {
        for (var i = 0; i < 2000; i+=100){
          //creating REST call
          this.http.get(this.nflEditorRankingsURL + "&offset=" + i).toPromise().then(
              res => { // Success     
                  var jsonResult = res.json()["players"]; //grab array of search results from json
                  jsonResult.forEach(result => {
                      //add bye week
                      result["bye"] = this.byes[result["teamAbbr"]];
                      this.modifiableResults.push(result); //load temporary list for positional rankings
                      
                      //create copy of list
                      var newMap = {};
                      for (var i in result)
                       newMap[i] = result[i];

                      //load overall rankings
                      this.overallResults.push(newMap);
                  });
                  resolve();
                }
          )};
          
      }).then(() => [this.addIndivRank()]); //load positional lists)

      //console.log(this.overallResults[1886]);
      
      return promise;
  }
  
  getResults(position: string, mode: string = "normal"): any[]{
    if(mode == "normal"){
      //this.getMappings(); //ensure result lists are up-to-date
      //console.log("filter value: " + filterValue);
      console.log("position: " + position);
      if(position == "OVERALL"){
        return this.overallResults.slice(0,50);
      }
      else{
        var filteredList = this.overallResults.filter(function(result){
          return result["position"] == position;
        });
  
        return filteredList.slice(0,50);
      }
      
      //return this.resultMappings[filterValue].slice(0,200);
    }

    //for future expansion if want to do idp
    else{

    }

    return [];

  }

  getSelected(){
    return this.selectedPlayers;
  }
  selectPlayer(playerRank: number, position: string){
    var overallIndex= 0;
    var offset = 0;

    //safety check in case the player rank is larger than the remaining list 
    //(example: rank = 300 but list is only 200 players left)
    var startIndex = playerRank > this.overallResults.length - 1 ? this.overallResults.length - 1 : playerRank;

    var player = this.overallResults[startIndex - offset];

    //find player from overall list
    this.overallResults.forEach(player => {
      if(parseInt(player["rank"]) == playerRank){
        overallIndex = this.overallResults.indexOf(player);
      }
    }); 

    //add player as selected and remove from overall list
    player = this.overallResults.splice(overallIndex, 1)[0];
    player["taken"] = this.selectedPlayers.length + 1 + ""; //because pushing
    //console.log(player);
    this.selectedPlayers.push(player);


  }



  unselectPlayer(playerRank: number, position: string){
    var selectedIndex= 0;
    var offset = 0;
    var oOffset = 0;

    var overallIndex = 0;
    var oStartIndex = 0;
    var oOffset = 0;

    //safety check in case the player rank is larger than the remaining list 
    //(example: rank = 300 but list is only 200 players left)
    var startIndex = this.selectedPlayers.length - 1;
    var oStartIndex = playerRank > this.overallResults.length - 1 ? this.overallResults.length - 1 : playerRank;
    


  
    var player = this.selectedPlayers[startIndex - offset];
   
    var overallPlayer = this.overallResults[oStartIndex - oOffset];
  


    this.selectedPlayers.forEach(p => {
      if(parseInt(p["rank"]) == playerRank){
        player = p;
        selectedIndex = this.selectedPlayers.indexOf(p);
      }
      
    })
    
    console.log("playerrank: " + playerRank);
    //get the insertion index back into overall list 
    this.overallResults.forEach(overallResult =>{
      //compare to 0 so only overwrite it once
      if(parseInt(overallResult["rank"]) > playerRank && overallIndex == 0){
        console.log("overallResult Rank: " + overallResult["rank"]);
        overallIndex = this.overallResults.indexOf(overallResult);
        console.log("overallIndex: " + overallIndex);
      }
    });

    

    
    

    //reset because hasn't been taken
    player = this.selectedPlayers.splice(selectedIndex, 1);
    player = player[0];
    player["taken"] = ""; 

    
    //re-rank taken
    var taken = 0;

    this.selectedPlayers.forEach(player => {
      player["taken"] = ++taken + "";
    })


    this.overallResults.splice(overallIndex, 0, player);

  }

  private addIndivRank(){
    var qbCount = 0; var rbCount = 0; var wrCount = 0;
    var teCount = 0; var defCount = 0; var kCount = 0;

    this.overallResults.forEach(result => {
      result["taken"] = ""; //add field so all data is consistent
      if(result["position"] == "QB" && result["rank"] > 0){
        result["indivRank"] = ++qbCount + "";
      }
      else if(result["position"] == "RB" && result["rank"] > 0){
        result["indivRank"] = ++rbCount + "";
      }
      else if(result["position"] == "WR" && result["rank"] > 0){
        result["indivRank"] = ++wrCount + "";
      }

      
      else if(result["position"] == "TE" && result["rank"] > 0){
        result["indivRank"] = ++teCount + "";
      }
      else if(result["position"] == "DEF" && result["rank"] > 0){
        result["indivRank"] = ++defCount + "";
      }

      else if(result["position"] == "K" && result["rank"] > 0){
        result["indivRank"] = ++kCount + "";
      }   
    });

  }


  

  /*   oldSelectPlayer(playerID: string, position: string){
    var overallIndex= 0;
    var individualIndex = 0;

    //find player from overall list
    this.overallResults.forEach(player => {
      if(player["id"] == playerID){
        overallIndex = this.overallResults.indexOf(player);
      }
    });
    //find player from individual list
    this.resultMappings[position].forEach(iPlayer => {
      if(iPlayer["id"] == playerID){
        individualIndex = this.resultMappings[position].indexOf(iPlayer);
      }
    });

    //add player as selected and remove from overall list
    var player = this.overallResults.splice(overallIndex, 1);
    player["taken"] = this.selectedPlayers.length + 1; //since pushing the player to end, should know this
    this.selectedPlayers.push(player);

    //remove player from positional list
    this.selectedPlayersIndiv.push(this.resultMappings[position].splice(individualIndex, 1));

  } */

  /*   private loadLists(results: {}[]){
    var qbCount = 0; var rbCount = 0; var wrCount = 0;
    var teCount = 0; var defCount = 0; var kCount = 0;

    //reset lists so do not incorrectly append on reload
    this.wrResults = []; this.rbResults = []; this.qbResults = [];
    this.teResults = []; this.defResults = []; this.kResults = [];
 
    //load lists
    results.forEach(result => {
      if(result["position"] == "QB" && result["rank"] > 0){

        this.qbResults.push(result);
        //this.qbResults[qbCount]["rank"] = qbCount + 1;
        qbCount++;
      }
      else if(result["position"] == "RB" && result["rank"] > 0){
        this.rbResults.push(result);
       // this.rbResults[rbCount]["rank"] = rbCount + 1;
        rbCount++;
      }
      else if(result["position"] == "WR" && result["rank"] > 0){
        this.wrResults.push(result);
        //this.wrResults[wrCount]["rank"] = wrCount + 1;
        wrCount++;
      }

      
      else if(result["position"] == "TE" && result["rank"] > 0){
        this.teResults.push(result);
        //this.teResults[teCount]["rank"] = teCount + 1;
        teCount++;
      }
      else if(result["position"] == "DEF" && result["rank"] > 0){
        this.defResults.push(result);
        //this.defResults[defCount]["rank"] = defCount + 1;
        defCount++;
      }

      else if(result["position"] == "K" && result["rank"] > 0){
        this.kResults.push(result);
        //this.kResults[kCount]["rank"] = kCount + 1;
        kCount++;
      }
      

      this.modifiableResults = []; //reset so that do not keep appending same results to list
    });

    this.updateIndividualListRankings();
  } */

/*   private getMappings(){
    this.resultMappings = {
      "OVERALL": this.overallResults,
      "WR": this.wrResults,
      "RB": this.rbResults,
      "QB": this.qbResults,
      "TE": this.teResults,
      "DEF": this.defResults,
      "K": this.kResults
    }
  }

  private updateRankings(rankings: {}[]){
    var rank = 1;
    rankings.forEach(ranking =>{
      ranking["rank"] = rank++;
    });
  }

  private updateIndividualListRankings(){
    function sortRank(a, b){return a["rank"] - b["rank"]};

    this.qbResults.sort(sortRank);
    this.wrResults.sort(sortRank);
    this.rbResults.sort(sortRank);
    this.teResults.sort(sortRank);
    this.defResults.sort(sortRank);
    this.kResults.sort(sortRank);


    this.updateRankings(this.qbResults);
    this.updateRankings(this.wrResults);
    this.updateRankings(this.rbResults);
    this.updateRankings(this.teResults);
    this.updateRankings(this.defResults);
    this.updateRankings(this.kResults);
  }
   */

}

