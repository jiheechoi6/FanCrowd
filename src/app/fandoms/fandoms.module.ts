import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { FandomsComponent } from './fandoms.component';
import { FandomsRoutingModule } from './fandoms-routing.module';
import { FandomSelectionComponent } from './fandom-selection/fandom-selection.component';
import { AddDialogComponent } from '../shared/components/add-dialog/add-dialog.component';
import { FandomDetailComponent } from './fandom-detail/fandom-detail.component';

@NgModule({
  declarations: [
    FandomsComponent,
    FandomSelectionComponent,
    AddDialogComponent,
    FandomDetailComponent,
  ],
  imports: [CommonModule, CoreModule, SharedModule, FandomsRoutingModule],
})
export class FandomsModule {}
