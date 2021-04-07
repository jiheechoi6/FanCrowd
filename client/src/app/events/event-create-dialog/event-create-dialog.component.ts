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
  user: {
    username: string;
    profileURL: string;
    role: string;
  };
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
  fandomsForCategory: Fandom[] = [];
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
      this.fetchFandomsForCategory(this.event.fandom.category.name);
    } else {
      const defaultStartDate = new Date();
      defaultStartDate.setHours(new Date().getHours() + 1);
      const defaultEndDate = new Date();
      defaultEndDate.setDate(defaultStartDate.getDate() + 1);
      this.eventDateRange = [defaultStartDate, defaultEndDate];

      this.event = {
        name: '',
        fandom: {
          category: {
            _id: '',
            name: '',
            backgroundURL: '',
          },
          _id: '',
          name: '',
          backgroundURL: '',
          createdAt: new Date(),
        },
        description: '',
        startDate: this.eventDateRange[0],
        endDate: this.eventDateRange[1],
        location: '',
        postedBy: {
          username: this.data.user.username,
          profileURL: this.data.user.profileURL,
          role: this.data.user.role,
        },
        totalAttendance: 0,
      };
    }
  }

  ngOnInit() {
    this._fandomService.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  categoryChange(event: any) {
    this.fetchFandomsForCategory(event.value);
  }

  fetchFandomsForCategory(categoryName: string) {
    this._fandomService
      .getFandomsByCategories(categoryName)
      .subscribe((categoryFandoms) => {
        this.fandomsForCategory = categoryFandoms.fandoms;
      });
  }

  fandomChange(event: any) {
    this.fandomsForCategory.forEach((fandom) => {
      if (fandom.name === event.value) {
        this.event.fandom._id = fandom._id;
      }
    });
  }

  setStartDateAndEndDate() {
    this.event.startDate = this.eventDateRange[0];
    this.event.endDate = this.eventDateRange[1];
  }

  createEvent() {
    this.setStartDateAndEndDate();
    this._eventService.createEvent(this.event).subscribe((newEvent) => {
      this.dialogRef.close(newEvent);
    });
  }

  updateEvent() {
    this.setStartDateAndEndDate();
    this._eventService
      .updateEventById(this.event._id, this.event)
      .subscribe((updatedEvent) => {
        this.dialogRef.close(updatedEvent);
      });
  }
}
