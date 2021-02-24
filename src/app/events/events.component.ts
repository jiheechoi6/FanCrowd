import { Component, OnInit } from '@angular/core';

interface Event {
  id: number;
  fandomType: string;
  name: string;
  description: string;
  postedBy: string;
  location: string;
  startDate: string;
  endDate: string;
  totalAttendance: number; // Not including the person that created the event
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit {

  events: Array<Event> = [];
  today = new Date();

  constructor() { }

  ngOnInit(): void {
    let Event1 = {
      id: 1,
      fandomType: "books",
      name: "Comic Con",
      description: `A comic book convention or comic con is an event with a 
      primary focus on comic books and comic book culture, in which comic book 
      fans gather to meet creators, experts, and each other. Commonly, comic conventions 
      are multi-day events hosted at convention centers, hotels, or college campuses.`,
      postedBy: "user1",
      location: "Toronto, Ontario, Canada",
      startDate: this.setDateFromToday(0),
      endDate: this.setDateFromToday(2),
      totalAttendance: 2,
    }

    let Event2 = {
      id: 2,
      fandomType: "technology",
      name: "World Expo",
      description: `Our once-in-a-lifetime celebration – the largest event ever staged in the 
      Arab world – is set to welcome 190 participating countries, and millions of visitors from 
      across the globe. Here they will experience warm Emirati hospitality at its finest, as 
      well as the UAE’s values of inclusion, tolerance and cooperation. Youth are at the heart 
      of our World Expo. That’s why Expo 2020 aspires to create a meaningful legacy that will 
      benefit generations to come, both locally and globally, spanning everything from innovations 
      and architecture to friendships and business opportunities.`,
      postedBy: "user2",
      location: "Dubai, UAE",
      startDate: this.setDateFromToday(-1),
      endDate: this.setDateFromToday(1),
      totalAttendance: 0,
    }

    let Event3 = {
      id: 3,
      fandomType: "movies",
      name: "Marvel Studios",
      description: `Marvel Studios, LLC is an American film and television studio that is a 
      subsidiary of Walt Disney Studios, a division of The Walt Disney Company. Marvel Studios 
      is known for the production of the Marvel Cinematic Universe films, based on characters 
      that appear in Marvel Comics publications.`,
      postedBy: "admin",
      location: "San Fransico, California, USA",
      startDate: this.setDateFromToday(-2),
      endDate: this.setDateFromToday(3),
      totalAttendance: 1,
    }

    this.events = [Event1, Event2, Event3];
  }

  setDateFromToday(offset: number): string{
    let day = this.today.getDate() + offset;
    let month = this.today.getMonth() + 1;
    let year = this.today.getFullYear();

    return day + "/" + month + "/" + year;
  }

  // This should be done in a modal window, but it's here for now
  create(): void{
    let Event4 = {
      id: 4,
      fandomType: "shows",
      name: "Game of Thrones Convention",
      description: `Nine noble families wage war against each other in order to gain 
      control over the mythical land of Westeros. Meanwhile, a force is rising after 
      millenniums and threatens the existence of living men.`,
      postedBy: "user1",
      location: "Waterloo, Ontario, Canada",
      startDate: this.setDateFromToday(-2),
      endDate: this.setDateFromToday(3),
      totalAttendance: 2,
    }

    this.events.push(Event4);
  }

  delete(id: number): void{
    let index = this.events.findIndex(event => event.id === id);
    
    if (index >= 0){
      this.events.splice(index, 1);
    }
  }
}