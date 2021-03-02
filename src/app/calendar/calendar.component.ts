import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DateEventDialogComponent } from './date-event-dialog/date-event-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit{

  months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  today:any = new Date();
  displayMonth:number = this.today.getMonth()
  displayMonthString:string = this.months[this.displayMonth]
  displayYear:number = this.today.getFullYear()
  
  displayFirstDay = new Date(this.displayYear, this.displayMonth, 1).getDay()
  displayLastDate = new Date(this.displayYear, this.displayMonth+1, 0).getDate()
  displayLastDay = new Date(this.displayYear, this.displayMonth, this.displayLastDate)
  displayPrevMonthLastDate = new Date(this.displayYear, this.displayMonth, 0).getDate()

  fullDate = this.today.toDateString()

  constructor(
    private authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  updateDateValues(){
    this.displayMonth= this.today.getMonth()
    this.displayMonthString = this.months[this.displayMonth]
    this.displayYear = this.today.getFullYear()
    
    this.displayFirstDay = new Date(this.displayYear, this.displayMonth, 1).getDay()
    this.displayLastDate = new Date(this.displayYear, this.displayMonth+1, 0).getDate()
    this.displayLastDay = new Date(this.displayYear, this.displayMonth, this.displayLastDate)
    this.displayPrevMonthLastDate = new Date(this.displayYear, this.displayMonth, 0).getDate()
    this.fullDate = this.today.toDateString()
  }

  prevMonth(){
    this.today.setMonth(this.today.getMonth()-1)
    this.updateDateValues()
  }

  nextMonth(){
    this.today.setMonth(this.today.getMonth()+1)
    this.updateDateValues()
  }
  
  getEvents(i: number){
    console.log(i);
    console.log(this.displayMonth);
    console.log(this.authService.getCurrentLoggedInUserEvents());

  }

  hasEvent(i: number){
    let result = false;
    this.authService.getCurrentLoggedInUserEvents()?.forEach((event) => {
      if(event.date.getFullYear() == this.displayYear &&
          event.date.getMonth() == this.displayMonth &&
          event.date.getDate() == i){
        result = true;
      }else{
        result = false;
      }
    });
    return result;
  }

  openDateEventDialog(i:number) {
    let events = this.getEvents(i);
    const dialogRef = this.dialog.open(DateEventDialogComponent, {
      data: { events },
      autoFocus: false,
      backdropClass: 'material-dialog-backdrop',
      width: '400px',
    });
  }

  counter(i: number) {
    return new Array(i);
  }

}
