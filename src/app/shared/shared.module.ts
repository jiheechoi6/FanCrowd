import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CoreModule } from '../core/core.module';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { EventsSummaryCardComponent } from './components/events-summary-card/events-summary-card.component';
import { ReviewStarsComponent } from './components/review-stars/review-stars.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    DeleteDialogComponent,
    EventsSummaryCardComponent,
    ReviewStarsComponent,
  ],
  imports: [CommonModule, CoreModule],
  exports: [
    SpinnerComponent,
    DeleteDialogComponent,
    EventsSummaryCardComponent,
    ReviewStarsComponent,
  ],
})
export class SharedModule {}
