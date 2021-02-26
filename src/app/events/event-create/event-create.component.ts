import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from '../../core/services/event.service';
import Event from '../../shared/models/event.model';

@Component({
  selector: 'event-create-dialog',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.sass'],
})
export class EventCreateDialogComponent implements OnInit {
  newEvent: Event;

  constructor(
    public dialogRef: MatDialogRef<EventCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {},
    private eventService: EventService
  ) {
    const defaultStartDate = new Date();
    const defaultEndDate = new Date();
    defaultEndDate.setDate(defaultStartDate.getDate() + 1);
    this.newEvent = {
      name: '',
      description: '',
      startDate: defaultStartDate,
      endDate: defaultEndDate,
      location: '',
      postedBy: 'user2',
      totalAttendance: 0,
    };
  }

  ngOnInit(): void {}

  createEvent() {
    this.eventService.createEvent(this.newEvent);
    this.dialogRef.close(this.newEvent);
  }
}
