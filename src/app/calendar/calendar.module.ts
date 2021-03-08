import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { DateEventDialogComponent } from './date-event-dialog/date-event-dialog.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: CalendarComponent }];

@NgModule({
  declarations: [CalendarComponent, DateEventDialogComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class CalendarModule {}
