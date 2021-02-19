import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscussionBoardComponent } from './discussion-board.component';
import { DiscussionBoardRoutingModule } from './discussion-board-routing.module';

@NgModule({
  declarations: [DiscussionBoardComponent],
  imports: [CommonModule, DiscussionBoardRoutingModule],
})
export class DiscussionBoardModule {}
