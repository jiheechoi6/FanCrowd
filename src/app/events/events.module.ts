import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { EventsComponent } from './events.component';
import { EventComponent } from './event/event.component';
import { EventCreateDialogComponent } from './event-create-dialog/event-create-dialog.component';
import { ReviewDialogComponent } from './event/review-dialog/review-dialog.component';
import { EventsRoutingModule } from './events-routing.module';
import { EditReviewDialogComponent } from './event/edit-review-dialog/edit-review-dialog.component';

@NgModule({
  declarations: [
    EventsComponent,
    EventCreateDialogComponent,
    EventComponent,
    ReviewDialogComponent,
    EditReviewDialogComponent,
  ],
  imports: [CommonModule, CoreModule, SharedModule, EventsRoutingModule],
})
export class EventsModule {}
