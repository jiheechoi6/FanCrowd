import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../core/services/event.service';
import Event from '../shared/models/event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit {

  events: Array<Event> = [];
  today = new Date();
  isAdmin = false;

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.events = this.eventService.getEvents();
    const username: string = this.activatedRoute.snapshot.params['username'];
    if (username && username.includes("admin")){
      this.isAdmin = true;
    }
  }

  setDateFromToday(offset: number): string{
    let day = this.today.getDate() + offset;
    let month = this.today.getMonth() + 1;
    let year = this.today.getFullYear();

    return day + "/" + month + "/" + year;
  }

  // This should be done in a modal window, but it's here for now
  create(): void{
    let event = {
      id: 4,
      fandomType: "shows",
      name: "Game of Thrones Convention",
      description: `Nine noble families wage war against each other in order to gain 
      control over the mythical land of Westeros. Meanwhile, a force is rising after 
      millenniums and threatens the existence of living men.`,
      postedBy: "user1",
      location: "Waterloo, Ontario, Canada",
      startDate: this.setDateFromToday(-2),
      endDate: this.setDateFromToday(3),
      totalAttendance: 2,
    }

    this.eventService.createEvent(event);
    this.events = this.eventService.getEvents();
  }

  delete(id: number): void{
    let index = this.events.findIndex(event => event.id === id);
    this.eventService.deleteEvent(index);
  }
}