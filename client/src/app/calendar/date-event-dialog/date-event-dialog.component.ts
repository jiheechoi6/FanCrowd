import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Event from 'src/app/shared/models/event';

interface DialogData {
  events: Event[];
  selectedDate: Date;
}

@Component({
  selector: 'app-date-event-dialog',
  templateUrl: './date-event-dialog.component.html',
  styleUrls: ['./date-event-dialog.component.sass'],
})
export class DateEventDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DateEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    console.log(this.data.events)
  }
}
