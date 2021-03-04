import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DiscussionBoardComponent } from './discussion-board.component';
import { FandomSelectionComponent } from './Fandom-selection/fandom-selection.component';

const routes: Routes = [{ path: '', component: DiscussionBoardComponent }, { path: ':category', component: FandomSelectionComponent }];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscussionBoardRoutingModule {}
