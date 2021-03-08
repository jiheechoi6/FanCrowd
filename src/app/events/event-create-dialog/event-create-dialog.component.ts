import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Category from 'src/app/shared/models/category';
import Fandom from 'src/app/shared/models/fandom';
import { EventService } from '../../core/services/event.service';
import { FandomService } from '../../core/services/fandom.service';
import Event from '../../shared/models/event';

@Component({
  selector: 'event-create-dialog',
  templateUrl: './event-create-dialog.component.html',
  styleUrls: ['./event-create-dialog.component.sass'],
})
export class EventCreateDialogComponent implements OnInit {
  newEvent: Event;
  minDate: Date;
  categories: Category[] = [];
  fandomForCategory: Fandom[] = [];
  eventDateRange: Date[];

  dateRangeErrorMatcher = {
    isErrorState: (control: FormControl, form: FormGroupDirective): boolean => {
      if (control.value) {
        const startDate: Date = control.value[0];
        const endDate: Date = control.value[1];
        const dateRangeInvalid =
          !startDate ||
          !endDate ||
          control.errors?.owlDateTimeParse ||
          endDate < startDate;
        return dateRangeInvalid && control.touched;
      }
      return false;
    },
  };

  constructor(
    public dialogRef: MatDialogRef<EventCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { username: string },
    private eventService: EventService,
    private fandomService: FandomService
  ) {
    this.minDate = new Date();
    const defaultStartDate = new Date();
    const defaultEndDate = new Date();
    defaultEndDate.setDate(defaultStartDate.getDate() + 1);

    this.eventDateRange = [defaultStartDate, defaultEndDate];
    this.newEvent = {
      id: 1000,
      name: '',
      fandomType: {
        category: '',
        name: '',
      },
      description: '',
      startDate: this.eventDateRange[0],
      endDate: this.eventDateRange[1],
      location: '',
      postedBy: this.data.username,
      totalAttendance: 0,
      reviews: [],
    };
  }

  ngOnInit(): void {
    this.categories = this.fandomService.getCategories();
  }

  categoryChange(event: any) {
    this.fandomForCategory = this.fandomService.getFandomsByCategories(
      event.value
    );
  }

  createEvent() {
    this.newEvent.startDate = this.eventDateRange[0];
    this.newEvent.endDate = this.eventDateRange[1];
    this.eventService.createEvent(this.newEvent);
    this.dialogRef.close(this.newEvent);
  }
}
