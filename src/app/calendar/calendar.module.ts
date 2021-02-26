import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CalendarComponent],
  imports: [CommonModule, CalendarRoutingModule, CoreModule, SharedModule],
})
export class CalendarModule{

}
