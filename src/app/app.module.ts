import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DrafterTableComponent } from './drafter-table/drafter-table.component';
import { AllDraftTableComponent } from './all-draft-table/all-draft-table.component';
import { ByeWeekComponent } from './bye-week/bye-week.component';
import { FeatureBlocksComponent } from './feature-blocks/feature-blocks.component';
import { PlayerComponent } from './player/player.component';
import { PlayerListComponent } from './player-list/player-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DrafterTableComponent,
    AllDraftTableComponent,
    ByeWeekComponent,
    FeatureBlocksComponent,
    PlayerComponent,
    PlayerListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
