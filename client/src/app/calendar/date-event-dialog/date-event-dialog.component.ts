import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IEventSummary } from 'src/app/shared/models/event-summar';

interface DialogData {
  events: IEventSummary[];
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

  ngOnInit() {}
}
