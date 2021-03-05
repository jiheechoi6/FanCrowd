import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import EventDTO from 'src/app/shared/models/event-dto';

@Component({
  selector: 'app-date-event-dialog',
  templateUrl: './date-event-dialog.component.html',
  styleUrls: ['./date-event-dialog.component.sass']
})
export class DateEventDialogComponent implements OnInit {
  eventLst:EventDTO[] =[];

  constructor(
    public dialogRef: MatDialogRef<DateEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public date:any,
    private authService: AuthService
  ) {
   }

  ngOnInit(): void {
    this.authService.getCurrentLoggedInUserEvents()?.forEach((event) => {
      if(event.date.getFullYear() == this.date.year &&
          event.date.getMonth() == this.date.month &&
          event.date.getDate() == this.date.date){
        this.eventLst.push(event);
      }
    });
  }

  hasNoEvent(){
    if(this.eventLst.length == 0){
      return true
    }else{
      return false
    }
  }
}
