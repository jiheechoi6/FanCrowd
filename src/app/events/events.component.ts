import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../core/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { EventCreateDialogComponent } from './event-create/event-create.component';
import Event from '../shared/models/event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass'],
})
export class EventsComponent implements OnInit {
  events: Array<Event> = [];
  today = new Date();
  isAdmin = false;

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.events = this.eventService.getEvents();
    const username: string = this.activatedRoute.snapshot.params['username'];
    if (username && username.includes('admin')) {
      this.isAdmin = true;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EventCreateDialogComponent, {
      width: '800px',
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe((newEvent: Event) => {
      if (newEvent) {
        this.events = this.eventService.getEvents();
      }
    });
  }

  setDateFromToday(offset: number): string {
    let day = this.today.getDate() + offset;
    let month = this.today.getMonth() + 1;
    let year = this.today.getFullYear();

    return day + '/' + month + '/' + year;
  }

  delete(id: number | undefined) {
    if (id) {
      let index = this.events.findIndex((event) => event.id === id);
      this.eventService.deleteEvent(index);
    }
  }
}
