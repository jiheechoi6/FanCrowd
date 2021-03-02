import { Injectable } from '@angular/core';
import Event from 'src/app/shared/models/event';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  today = new Date();
  events: Event[] = [
    {
      id: 1,
      fandomType: {
        id: 11,
        category: "Books",
        name: "All" 
      },
      name: 'Comic Con',
      description: `A comic book convention or comic con is an event with a 
        primary focus on comic books and comic book culture, in which comic book 
        fans gather to meet creators, experts, and each other. Commonly, comic conventions 
        are multi-day events hosted at convention centers, hotels, or college campuses.`,
      postedBy: 'user1',
      location: 'Toronto, Ontario, Canada',
      startDate: new Date(),
      endDate: new Date(),
      totalAttendance: 2,
    },
    {
      id: 2,
      fandomType: {
        id: 30,
        category: "Technology",
        name: "All" 
      },
      name: 'World Expo',
      description: `Our once-in-a-lifetime celebration – the largest event ever staged in the 
        Arab world – is set to welcome 190 participating countries, and millions of visitors from 
        across the globe. Here they will experience warm Emirati hospitality at its finest, as 
        well as the UAE’s values of inclusion, tolerance and cooperation. Youth are at the heart 
        of our World Expo. That’s why Expo 2020 aspires to create a meaningful legacy that will 
        benefit generations to come, both locally and globally, spanning everything from innovations 
        and architecture to friendships and business opportunities.`,
      postedBy: 'user2',
      location: 'Dubai, UAE',
      startDate: new Date(),
      endDate: new Date(),
      totalAttendance: 0,
    },
    {
      id: 3,
      fandomType: {
        id: 1,
        category: "Movies",
        name: "Avengers" 
      },
      name: 'Marvel Studios',
      description: `Marvel Studios, LLC is an American film and television studio that is a 
        subsidiary of Walt Disney Studios, a division of The Walt Disney Company. Marvel Studios 
        is known for the production of the Marvel Cinematic Universe films, based on characters 
        that appear in Marvel Comics publications.`,
      postedBy: 'admin',
      location: 'San Fransico, California, USA',
      startDate: new Date(),
      endDate: new Date(),
      totalAttendance: 1,
    },
    {
      id: 4,
      fandomType: {
        id: 21,
        category: "Games",
        name: "God of War" 
      },
      name: 'Sony Game Release',
      description: `God of War is an action-adventure game franchise created by David Jaffe at 
        Sony's Santa Monica Studio. It began in 2005 on the PlayStation 2 video game console, and
        has become a flagship title for the PlayStation brand, consisting of eight games across 
        multiple platforms with a ninth currently in development.`,
      postedBy: 'admin',
      location: 'Los Angeles, California, USA',
      startDate: new Date(),
      endDate: new Date(),
      totalAttendance: 1,
    },
    {
      id: 5,
      fandomType: {
        id: 9,
        category: "Books",
        name: "Harry Potter" 
      },
      name: 'J.K Rowling Meet & Greet',
      description: `Harry Potter is a series of seven fantasy novels written by British author, 
        J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his 
        friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School 
        of Witchcraft and Wizardry.`,
      postedBy: 'user1',
      location: 'Vancouver, British Columbia, Canada',
      startDate: new Date(),
      endDate: new Date(),
      totalAttendance: 3,
    },
    {
      id: 6,
      fandomType: {
        id: 17,
        category: "Anime",
        name: "One Punch Man" 
      },
      name: 'Anime-Fest',
      description: `One-Punch Man is a Japanese superhero franchise created by the artist ONE. It 
        tells the story of Saitama, a superhero who can defeat any opponent with a single punch 
        but seeks to find a worthy opponent after growing bored by a lack of challenge due to his 
        overwhelming strength.`,
      postedBy: 'user2',
      location: 'New York City, New York, USA',
      startDate: new Date(),
      endDate: new Date(),
      totalAttendance: 2,
    },
    {
      id: 7,
      fandomType: {
        id: 26,
        category: "Sports",
        name: "Soccer" 
      },
      name: 'FIFA World Cup Party',
      description: `The FIFA World Cup, often simply called the World Cup, is an international 
        association football competition contested by the senior men's national teams of the members 
        of the Fédération Internationale de Football Association, the sport's global governing body.`,
      postedBy: 'admin',
      location: 'Westminister, London, United Kingdom',
      startDate: new Date(),
      endDate: new Date(),
      totalAttendance: 0,
    },
    {
      id: 8,
      fandomType: {
        id: 15,
        category: "Shows",
        name: "All" 
      },
      name: 'New HBO Show Press Release',
      description: `Home Box Office is an American pay television network owned by WarnerMedia 
        Studios & Networks and the flagship property of parent subsidiary Home Box Office, Inc.`,
      postedBy: 'user1',
      location: 'Seattle, Washington, USA',
      startDate: new Date(),
      endDate: new Date(),
      totalAttendance: 1,
    },
  ];

  constructor(private http: HttpClient) {}

  sortFunction(a: Event, b: Event) : number{  
    var dateA = new Date(a.startDate).getTime();
    var dateB = new Date(b.startDate).getTime();
    return dateA > dateB ? 1 : -1;  
  }

  getEvents(): Event[] {
    // Get events from server, code below requires server call

    return this.events.sort((a,b) => this.sortFunction(a,b));
  }

  getEventsById(id: number): Event | null {
    // Get event from server, code below requires server call

    return this.events.find((event) => event.id === id) || null;
  }

  createEvent(event: Event): void {
    // Add event to server, code below requires server call

    this.events.push(event);
  }

  deleteEvent(index: number): boolean {
    // Delete event from server, code below requires server call
    
    if (index >= 0) {
      this.events.splice(index, 1);
      return true;
    }

    return false;
  }
}
