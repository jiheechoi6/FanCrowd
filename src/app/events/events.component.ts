import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit {

  events: Array<string> | undefined;

  constructor() { }

  ngOnInit(): void {
    this.events = ["Event 1", "Event 2", "Event 3"];
  }

}