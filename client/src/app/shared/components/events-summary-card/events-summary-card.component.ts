import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEventSummary } from '../../models/event-summary';

@Component({
  selector: 'app-events-summary-card',
  templateUrl: './events-summary-card.component.html',
  styleUrls: ['./events-summary-card.component.sass'],
})
export class EventsSummaryCardComponent implements OnInit {
  @Input() events: IEventSummary[] = [];
  @Output() closeCalenderDialog = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  closeDialog() {
    this.closeCalenderDialog.emit(true);
  }
}
