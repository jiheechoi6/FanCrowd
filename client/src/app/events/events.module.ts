import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventCreateDialogComponent } from './event-create-dialog/event-create-dialog.component';
import { ReviewDialogComponent } from './create-review-dialog/create-review-dialog.component';
import { EventsRoutingModule } from './events-routing.module';
import { EditReviewDialogComponent } from './edit-review-dialog/edit-review-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    EventsComponent,
    EventCreateDialogComponent,
    EventDetailComponent,
    ReviewDialogComponent,
    EditReviewDialogComponent,
  ],
  imports: [CommonModule, CoreModule, SharedModule, EventsRoutingModule],
})
export class EventsModule {}
