import { Component, OnInit, Input } from '@angular/core';
import { Drafter } from '../data.model';

@Component({
  selector: 'app-bye-week',
  templateUrl: './bye-week.component.html',
  styleUrls: ['./bye-week.component.css']
})
export class ByeWeekComponent implements OnInit {
  
  @Input() profileDrafter: Drafter;
  byeWeeks: number[];

  constructor() {
    this.profileDrafter = new Drafter("placeholder", 1);
    this.byeWeeks = [4,5,6,7,8,9,10,11,12,13];
  }

  populateByeWeekCount(week: number): number{
    return this.profileDrafter.getByeCount(week);
  }

  ngOnInit() {
  }

}
