import { Component, OnInit } from '@angular/core';
import { PlayerRankingsService } from '../player-rankings.service';
import { Ranking } from '../data.model'

@Component({
  selector: 'app-all-player-lists',
  templateUrl: './all-player-lists.component.html',
  styleUrls: ['./all-player-lists.component.css']
})
export class AllPlayerListsComponent implements OnInit {
  ranking: Ranking;

  constructor(public playerRankingsService: PlayerRankingsService) {
    this.playerRankingsService.search();
    this.ranking= new Ranking("",[]);
  }

    /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
  displayOptions() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  getRanking(type: string){
    this.ranking = new Ranking(" - " + type, this.playerRankingsService.getResults(type));
  }

  ngOnInit() {
    
  }

}


// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  var e = <HTMLElement>event.target;
  if (!e.matches('.dropbtn')) {
  
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
  }
