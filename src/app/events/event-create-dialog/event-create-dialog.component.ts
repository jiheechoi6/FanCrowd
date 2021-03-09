import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Category from 'src/app/shared/models/category';
import Fandom from 'src/app/shared/models/fandom';
import { EventService } from '../../core/services/event.service';
import { FandomService } from '../../core/services/fandom.service';
import Event from '../../shared/models/event';

interface DialogData {
  eventBeingUpdated?: Event;
  username: string;
}

@Component({
  selector: 'event-create-dialog',
  templateUrl: './event-create-dialog.component.html',
  styleUrls: ['./event-create-dialog.component.sass'],
})
export class EventCreateDialogComponent implements OnInit {
  event: Event;
  minDate: Date;
  categories: Category[] = [];
  fandomForCategory: Fandom[] = [];
  eventDateRange: Date[];
  isEditingEvent = false;

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
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _eventService: EventService,
    private _fandomService: FandomService
  ) {
    this.minDate = new Date();

    if (this.data.eventBeingUpdated) {
      this.isEditingEvent = true;
      this.event = this.data.eventBeingUpdated;
      this.eventDateRange = [this.event.startDate, this.event.endDate];

      this.fandomForCategory = this._fandomService.getFandomsByCategories(
        this.event.fandomType.category
      );
    } else {
      const defaultStartDate = new Date();
      const defaultEndDate = new Date();
      defaultEndDate.setDate(defaultStartDate.getDate() + 1);
      this.eventDateRange = [defaultStartDate, defaultEndDate];

      this.event = {
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
  }

  ngOnInit(): void {
    this.categories = this._fandomService.getCategories();
  }

  categoryChange(event: any) {
    this.fandomForCategory = this._fandomService.getFandomsByCategories(
      event.value
    );
  }

  setStartDateAndEndDate() {
    this.event.startDate = this.eventDateRange[0];
    this.event.endDate = this.eventDateRange[1];
  }

  createEvent() {
    this.setStartDateAndEndDate();
    // this._eventService.createEvent(this.event);
    // this.dialogRef.close(this.event);
  }

  updateEvent() {
    console.log('in update');
    // this.setStartDateAndEndDate();
    // this._eventService.updateEventById(this.event.id, this.event);
    // this.dialogRef.close(this.event);
  }
}
