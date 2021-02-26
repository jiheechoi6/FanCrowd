import { Injectable } from '@angular/core';
import Event from 'src/app/shared/models/event.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EventService {
    today = new Date();
    events: Event[] = [
    {
        id: 1,
        fandomType: "books",
        name: "Comic Con",
        description: `A comic book convention or comic con is an event with a 
        primary focus on comic books and comic book culture, in which comic book 
        fans gather to meet creators, experts, and each other. Commonly, comic conventions 
        are multi-day events hosted at convention centers, hotels, or college campuses.`,
        postedBy: "user1",
        location: "Toronto, Ontario, Canada",
        startDate: "Feb/25/2021",
        endDate: "Feb/29/2021",
        totalAttendance: 2,
      },
      {
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
        startDate: "Feb/26/2021",
        endDate: "Feb/28/2021",
        totalAttendance: 0,
      },
      {
        id: 3,
        fandomType: "movies",
        name: "Marvel Studios",
        description: `Marvel Studios, LLC is an American film and television studio that is a 
        subsidiary of Walt Disney Studios, a division of The Walt Disney Company. Marvel Studios 
        is known for the production of the Marvel Cinematic Universe films, based on characters 
        that appear in Marvel Comics publications.`,
        postedBy: "admin",
        location: "San Fransico, California, USA",
        startDate: "Feb/25/2021",
        endDate: "Mar/1/2021",
        totalAttendance: 1,
      }
  ];

  constructor(private http: HttpClient) {}

  getEvents(): Event[] {
    return this.events;
  }

  createEvent(event: Event): void {
    this.events.push(event);
  }

  deleteEvent(index: number): boolean {
    if (index >= 0){
        this.events.splice(index, 1);
        return true;
    }

    return false;
  }
}
