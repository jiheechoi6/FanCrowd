import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from '../../core/services/event.service';
import { FandomService } from '../../core/services/fandom.service';
import Event from '../../shared/models/event';
import Fandom from '../../shared/models/fandom';

@Component({
  selector: 'event-create-dialog',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.sass'],
})
export class EventCreateDialogComponent implements OnInit {
  newEvent: Event;
  minDate: Date;
  categories: string[] = [];
  fandomByCategory: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<EventCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {},
    private eventService: EventService,
    private fandomService: FandomService,
  ) {
    this.minDate = new Date();
    const defaultStartDate = new Date();
    const defaultEndDate = new Date();
    defaultEndDate.setDate(defaultStartDate.getDate() + 1);
    this.newEvent = {
      name: '',
      fandomType: {
        category: '',
        name: ''
      },
      description: '',
      startDate: defaultStartDate,
      endDate: defaultEndDate,
      location: '',
      postedBy: 'user2',
      totalAttendance: 0,
    };
  }

  ngOnInit(): void {
    this.categories = this.fandomService.getCategories();
  }

  categoryChange(event: any){
    this.fandomByCategory = this.fandomService.getFandomsByCategories(event.value);
  }

  createEvent() {
    this.eventService.createEvent(this.newEvent);
    this.dialogRef.close(this.newEvent);
  }
}
