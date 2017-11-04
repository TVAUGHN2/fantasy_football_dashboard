import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2DragDropModule } from 'ng2-drag-drop'; //original use, 
import { DndModule } from 'ng2-dnd';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DrafterTableComponent } from './drafter-table/drafter-table.component';
import { AllDraftTableComponent } from './all-draft-table/all-draft-table.component';
import { ByeWeekComponent } from './bye-week/bye-week.component';
import { FeatureBlocksComponent } from './feature-blocks/feature-blocks.component';
import { PlayerComponent } from './player/player.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DraftroundsComponent } from './draftrounds/draftrounds.component';
import { FaqsComponent } from './faqs/faqs.component';
import { AllPlayerListsComponent } from './all-player-lists/all-player-lists.component';
import { ChatboxComponent } from './chatbox/chatbox.component';


import { DraftersService } from './drafters.service';
import { PlayerRankingsService } from './player-rankings.service';
import { ByeWeekService } from './bye-week.service';



const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'playerlist', component: AllPlayerListsComponent},
  { path: 'draftrounds', component: DraftroundsComponent},
  { path: 'faqs', component: FaqsComponent},
  { path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },

];

@NgModule({
  declarations: [
    AppComponent,
    DrafterTableComponent,
    AllDraftTableComponent,
    ByeWeekComponent,
    FeatureBlocksComponent,
    PlayerComponent,
    PlayerListComponent,
    NavbarComponent,
    DashboardComponent,
    DraftroundsComponent,
    FaqsComponent,
    AllPlayerListsComponent,
    ChatboxComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    Ng2DragDropModule.forRoot(),
    DndModule.forRoot()
  ],
  exports:[DndModule],
  providers: [
    DraftersService, 
    PlayerRankingsService, 
    ByeWeekService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
