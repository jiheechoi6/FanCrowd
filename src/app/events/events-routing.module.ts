import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';

const routes: Routes = [{ path: '', component: EventsComponent }, {path: ":id", component: EventsComponent }];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
