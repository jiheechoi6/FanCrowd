import { Component, Input, OnInit } from '@angular/core';
import { IEventSummary } from '../../models/event-summar';

@Component({
  selector: 'app-events-summary-card',
  templateUrl: './events-summary-card.component.html',
  styleUrls: ['./events-summary-card.component.sass'],
})
export class EventsSummaryCardComponent implements OnInit {
  @Input() events: IEventSummary[] = [];

  constructor() {}

  ngOnInit() {}
}
