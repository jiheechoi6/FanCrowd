import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit {

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

  constructor() { }

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

  counter(i: number) {
    return new Array(i);
  }

}
