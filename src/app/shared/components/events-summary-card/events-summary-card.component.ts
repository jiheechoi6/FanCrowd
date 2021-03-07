import { Component, Input, OnInit } from '@angular/core';
import EventDTO from '../../models/event-dto';

@Component({
  selector: 'app-events-summary-card',
  templateUrl: './events-summary-card.component.html',
  styleUrls: ['./events-summary-card.component.sass'],
})
export class EventsSummaryCardComponent implements OnInit {
  @Input() events: EventDTO[] = [];

  constructor() {}

  ngOnInit(): void {}
}
