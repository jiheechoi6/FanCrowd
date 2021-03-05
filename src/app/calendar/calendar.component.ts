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
  showdate:any = new Date();
  displayMonth:number = this.showdate.getMonth()
  displayMonthString:string = this.months[this.displayMonth]
  displayYear:number = this.showdate.getFullYear()
  
  displayFirstDay = new Date(this.displayYear, this.displayMonth, 1).getDay()
  displayLastDate = new Date(this.displayYear, this.displayMonth+1, 0).getDate()
  displayLastDay = new Date(this.displayYear, this.displayMonth, this.displayLastDate)
  displayPrevMonthLastDate = new Date(this.displayYear, this.displayMonth, 0).getDate()

  fullDate = this.showdate.toDateString()

  constructor(
    private authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  updateDateValues(){
    this.displayMonth= this.showdate.getMonth()
    this.displayMonthString = this.months[this.displayMonth]
    this.displayYear = this.showdate.getFullYear()
    
    this.displayFirstDay = new Date(this.displayYear, this.displayMonth, 1).getDay()
    this.displayLastDate = new Date(this.displayYear, this.displayMonth+1, 0).getDate()
    this.displayLastDay = new Date(this.displayYear, this.displayMonth, this.displayLastDate)
    this.displayPrevMonthLastDate = new Date(this.displayYear, this.displayMonth, 0).getDate()
    this.fullDate = this.showdate.toDateString()
  }

  prevMonth(){
    this.showdate.setMonth(this.showdate.getMonth()-1)
    this.updateDateValues()
  }

  nextMonth(){
    this.showdate.setMonth(this.showdate.getMonth()+1)
    this.updateDateValues()
  }
  
  getEvents(i: number){

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

  openDateEventDialog(date:number) {
    let year = this.displayYear
    let month = this.displayMonth
    const dialogRef = this.dialog.open(DateEventDialogComponent, {
      data: { year, month, date },
      autoFocus: false,
      backdropClass: 'material-dialog-backdrop',
      width: '400px',
    });
  }

  isToday(date:number){
    if(this.displayYear ==this.today.getFullYear() &&
      this.displayMonth == this.today.getMonth() &&
      date == this.today.getDate()){
        return true;
      }else{
        return false;
      }
  }

  counter(i: number) {
    return new Array(i);
  }

}
