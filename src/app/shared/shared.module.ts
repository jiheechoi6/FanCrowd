import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CoreModule } from '../core/core.module';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { EventsSummaryCardComponent } from './components/events-summary-card/events-summary-card.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    DeleteDialogComponent,
    EventsSummaryCardComponent,
  ],
  imports: [CommonModule, CoreModule],
  exports: [
    SpinnerComponent,
    DeleteDialogComponent,
    EventsSummaryCardComponent,
  ],
})
export class SharedModule {}
