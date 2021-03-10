import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FandomsComponent } from './fandoms.component';
import { FandomSelectionComponent } from './fandom-selection/fandom-selection.component';
import { FandomDetailComponent } from './fandom-detail/fandom-detail.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

const routes: Routes = [
  { path: '', component: FandomsComponent },
  { path: ':category', component: FandomSelectionComponent },
  { path: ':category/:fandom', component: FandomDetailComponent },
  { path: ':category/:fandom/posts/:postId', component: PostDetailComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FandomsRoutingModule {}
