import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../core/services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { EventCreateDialogComponent } from './event-create/event-create.component';
import Event from '../shared/models/event';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass'],
})
export class EventsComponent implements OnInit {
  events: Array<Event> = [];
  allEvents: Array<Event> = [];
  event: Event | null = null;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  pageSize: number = this.pageSizeOptions[1];
  pageIndex: number = 0;
  today: Date = new Date();
  isAdmin: boolean = false;
  isSpecificEvent: boolean = false;
  id: number = NaN;

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.isSpecificEvent = !isNaN(this.id);
  }

  ngOnInit(): void {
    if (!this.isSpecificEvent){
      this.allEvents = this.eventService.getEvents();
      this.events = this.allEvents.slice(0, 10);
    } else {
      this.event = this.eventService.getEventsById(this.id);
    }
    const username: string = this.activatedRoute.snapshot.params['username'];
    if (username && username.includes('admin')) {
      this.isAdmin = true;
    }
  }

  selectPage(event: any){
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    let startIndex = event.pageSize * event.pageIndex;
    let endIndex = startIndex + event.pageSize;
    this.events = this.allEvents.slice(startIndex, endIndex);
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

  goToEvent(eventId: number | undefined): void{
    this.router.navigate(['events', eventId])
  }

  goToAllEvents(): void{
    this.router.navigate(['events'])
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
