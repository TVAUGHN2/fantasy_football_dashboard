import { Component, OnInit, Input } from '@angular/core';
import { DraftersService } from '../drafters.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  draftersService: DraftersService = new DraftersService(drafterMaps);
  
  constructor() { }

  ngOnInit() {
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