import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DiscussionBoardComponent } from './discussion-board.component';
import { FandomSelectionComponent } from './fandom-selection/fandom-selection.component';
import { EventsComponent } from '../events/events.component';

const routes: Routes = [
  { path: '', component: DiscussionBoardComponent }, 
  { path: ':category', component: FandomSelectionComponent },
  { path: ':category/:fandom', component: EventsComponent }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscussionBoardRoutingModule {}
