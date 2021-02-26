import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { EventsRoutingModule } from './events-routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule, 
    EventsRoutingModule,
    MatButtonModule
  ],
})
export class EventsModule {}