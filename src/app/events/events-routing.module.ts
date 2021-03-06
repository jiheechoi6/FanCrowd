import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';
import { EventComponent } from './event/event.component';

const routes: Routes = [
  { path: '', component: EventsComponent }, 
  { path: ":id", component: EventComponent },
  { path: ':category/:fandom', component: EventsComponent }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
