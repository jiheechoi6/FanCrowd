import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FandomsComponent } from './fandoms.component';
import { FandomSelectionComponent } from './fandom-selection/fandom-selection.component';
import { FandomDetailComponent } from './fandom-detail/fandom-detail.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Fandoms',
    },
    children: [
      { path: '', component: FandomsComponent },
      {
        path: ':category',
        children: [
          { path: '', component: FandomSelectionComponent },
          {
            path: ':fandom',
            children: [
              { path: '', component: FandomDetailComponent },
              {
                path: 'posts/:postId',
                component: PostDetailComponent,
                data: {
                  breadcrumb: {
                    alias: 'postName',
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FandomsRoutingModule {}
