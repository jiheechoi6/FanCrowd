import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { DateEventDialogComponent } from './date-event-dialog/date-event-dialog.component';

@NgModule({
  declarations: [CalendarComponent, DateEventDialogComponent],
  imports: [CommonModule, CalendarRoutingModule, CoreModule, SharedModule],
})
export class CalendarModule {}
