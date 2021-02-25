import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCreateDialogComponent } from './event-create.component';
import { EventsRoutingModule } from '../events-routing.module';

@NgModule({
  declarations: [EventCreateDialogComponent],
  imports: [
    CommonModule, 
    EventsRoutingModule
  ],
})
export class EventCreateModule {}