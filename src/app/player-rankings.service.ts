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

  private resultMappings: {} = {};
  private byes: {} = {}

  constructor(private http: Http, private byeWeekService: ByeWeekService) {
    this.byeWeekService.search(); //ensure this variable is populated
    this.byes = this.byeWeekService.getByeWeeks();
  }

  search(): Promise<any>{
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
          this.loadLists(this.modifiableResults); //load positional lists
      });

      return promise;
  }


  private loadLists(results: {}[]){
    var qbCount = 0; var rbCount = 0; var wrCount = 0;
    var teCount = 0; var defCount = 0; var kCount = 0;

    //reset lists so do not incorrectly append on reload
    this.wrResults = []; this.rbResults = []; this.qbResults = [];
    this.teResults = []; this.defResults = []; this.kResults = [];
 
    //load lists
    results.forEach(result => {
      if(result["position"] == "QB"){

        this.qbResults.push(result);
        this.qbResults[qbCount]["rank"] = qbCount + 1;
        qbCount++;
      }
      else if(result["position"] == "RB"){
        this.rbResults.push(result);
        this.rbResults[rbCount]["rank"] = rbCount + 1;
        rbCount++;
      }
      else if(result["position"] == "WR"){
        this.wrResults.push(result);
        this.wrResults[wrCount]["rank"] = wrCount + 1;
        wrCount++;
      }

      
      else if(result["position"] == "TE"){
        this.teResults.push(result);
        this.teResults[teCount]["rank"] = teCount + 1;
        teCount++;
      }
      else if(result["position"] == "DEF"){
        this.defResults.push(result);
        this.defResults[defCount]["rank"] = defCount + 1;
        defCount++;
      }

      else if(result["position"] == "K"){
        this.kResults.push(result);
        this.kResults[kCount]["rank"] = kCount + 1;
        kCount++;
      }
      

      this.modifiableResults = []; //reset so that do not keep appending same results to list
    });

    
  }

  getResults(filterValue: string, mode: string = "normal"): string[]{
    if(mode == "normal"){
      this.getMappings(); //ensure result lists are up-to-date
      return this.resultMappings[filterValue].slice(0,200);
    }

    //for future expansion if want to do idp
    else{

    }

    return [];

  }

  private getMappings(){
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
}
