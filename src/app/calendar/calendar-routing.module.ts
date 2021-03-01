import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar.component';
import { AuthGuard } from '../core/services/auth.guard';

const routes: Routes = [
  { path: '', component: CalendarComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
