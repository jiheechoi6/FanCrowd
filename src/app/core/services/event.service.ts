import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import Event from 'src/app/shared/models/event';
import Review from 'src/app/shared/models/review';

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
        category: 'Books',
        name: 'Harry Potter',
      },
      name: 'Comic Con',
      description: `A comic book convention or comic con is an event with a 
        primary focus on comic books and comic book culture, in which comic book 
        fans gather to meet creators, experts, and each other. Commonly, comic conventions 
        are multi-day events hosted at convention centers, hotels, or college campuses.`,
      postedBy: 'user1',
      location: 'Toronto, Ontario, Canada',
      startDate: new Date(2021, 10, 12),
      endDate: new Date(2021, 10, 14),
      totalAttendance: 2,
      reviews: [
        {
          id: 1,
          title: 'Great Event',
          rating: 4,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Congue nisi vitae suscipit tellus mauris a diam maecenas.`,
          postedBy: {
            username: 'user1',
            profileUrl:
              'https://mocah.org/uploads/posts/5420641-moon-night-black-space-halloween-star-supermoon-nature-sterne-super-moon-galaxy-universe-sky-nightime-creative-commons-images.jpg',
            role: 'user',
          },
          postDate: new Date(2021, 1, 15),
        },
        {
          id: 2,
          title: "Amazing, Lot's of fun",
          rating: 5,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Congue nisi vitae suscipit tellus mauris a diam maecenas.`,
          postedBy: {
            username: 'user2',
            profileUrl:
              'https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg',
            role: 'user',
          },
          postDate: new Date(2021, 1, 15),
        },
        {
          id: 3,
          title: 'Best Time Ever!!!!!!',
          rating: 5,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Congue nisi vitae suscipit tellus mauris a diam maecenas.`,
          postedBy: {
            username: 'admin',
            profileUrl: 'https://dummyimage.com/250.jpg',
            role: 'admin',
          },
          postDate: new Date(2021, 1, 15),
        },
      ],
    },
    {
      id: 2,
      fandomType: {
        id: 30,
        category: 'Technology',
        name: 'Apple',
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
      startDate: new Date(2021, 5, 12),
      endDate: new Date(2021, 5, 14),
      totalAttendance: 2,
      reviews: [
        {
          id: 1,
          title: 'Cool tech!',
          rating: 5,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Congue nisi vitae suscipit tellus mauris a diam maecenas.`,
          postedBy: {
            username: 'user1',
            profileUrl:
              'https://mocah.org/uploads/posts/5420641-moon-night-black-space-halloween-star-supermoon-nature-sterne-super-moon-galaxy-universe-sky-nightime-creative-commons-images.jpg',
            role: 'user',
          },
          postDate: new Date(2021, 1, 15),
        },
        {
          id: 2,
          title: 'Nice things to see',
          rating: 3,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Congue nisi vitae suscipit tellus mauris a diam maecenas.`,
          postedBy: {
            username: 'user2',
            profileUrl:
              'https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg',
            role: 'user',
          },
          postDate: new Date(2021, 1, 15),
        },
      ],
    },
    {
      id: 3,
      fandomType: {
        id: 1,
        category: 'Movies',
        name: 'Avengers',
      },
      name: 'Marvel Studios',
      description: `Marvel Studios, LLC is an American film and television studio that is a 
        subsidiary of Walt Disney Studios, a division of The Walt Disney Company. Marvel Studios 
        is known for the production of the Marvel Cinematic Universe films, based on characters 
        that appear in Marvel Comics publications.`,
      postedBy: 'admin',
      location: 'San Fransico, California, USA',
      startDate: new Date(2021, 6, 12),
      endDate: new Date(2021, 7, 14),
      totalAttendance: 1,
      reviews: [],
    },
    {
      id: 4,
      fandomType: {
        id: 21,
        category: 'Games',
        name: 'God of War',
      },
      name: 'Sony Game Release',
      description: `God of War is an action-adventure game franchise created by David Jaffe at 
        Sony's Santa Monica Studio. It began in 2005 on the PlayStation 2 video game console, and
        has become a flagship title for the PlayStation brand, consisting of eight games across 
        multiple platforms with a ninth currently in development.`,
      postedBy: 'admin',
      location: 'Los Angeles, California, USA',
      startDate: new Date(2021, 4, 8),
      endDate: new Date(2021, 4, 11),
      totalAttendance: 1,
      reviews: [
        {
          id: 2,
          title: 'Great Release Party!!!',
          rating: 5,
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna eget est lorem ipsum dolor sit amet consectetur adipiscing. Congue nisi vitae suscipit tellus mauris a diam maecenas.`,
          postedBy: {
            username: 'admin',
            profileUrl: 'https://dummyimage.com/250.jpg',
            role: 'admin',
          },
          postDate: new Date(2021, 1, 15),
        },
      ],
    },
    {
      id: 5,
      fandomType: {
        id: 9,
        category: 'Books',
        name: 'Harry Potter',
      },
      name: 'J.K Rowling Meet & Greet',
      description: `Harry Potter is a series of seven fantasy novels written by British author, 
        J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his 
        friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School 
        of Witchcraft and Wizardry.`,
      postedBy: 'user1',
      location: 'Vancouver, British Columbia, Canada',
      startDate: new Date(2021, 9, 12),
      endDate: new Date(2021, 9, 15),
      totalAttendance: 3,
      reviews: [],
    },
    {
      id: 6,
      fandomType: {
        id: 17,
        category: 'Anime',
        name: 'One Punch Man',
      },
      name: 'Anime-Fest',
      description: `One-Punch Man is a Japanese superhero franchise created by the artist ONE. It 
        tells the story of Saitama, a superhero who can defeat any opponent with a single punch 
        but seeks to find a worthy opponent after growing bored by a lack of challenge due to his 
        overwhelming strength.`,
      postedBy: 'user2',
      location: 'New York City, New York, USA',
      startDate: new Date(2021, 7, 30),
      endDate: new Date(2021, 8, 1),
      totalAttendance: 2,
      reviews: [],
    },
    {
      id: 7,
      fandomType: {
        id: 26,
        category: 'Sports',
        name: 'Soccer',
      },
      name: 'FIFA World Cup Party',
      description: `The FIFA World Cup, often simply called the World Cup, is an international 
        association football competition contested by the senior men's national teams of the members 
        of the Fédération Internationale de Football Association, the sport's global governing body.`,
      postedBy: 'admin',
      location: 'Westminister, London, United Kingdom',
      startDate: new Date(2021, 11, 3),
      endDate: new Date(2021, 11, 8),
      totalAttendance: 1,
      reviews: [],
    },
    {
      id: 8,
      fandomType: {
        id: 15,
        category: 'Shows',
        name: 'Game of Thrones',
      },
      name: 'New HBO Show Press Release',
      description: `Home Box Office is an American pay television network owned by WarnerMedia 
        Studios & Networks and the flagship property of parent subsidiary Home Box Office, Inc.`,
      postedBy: 'user1',
      location: 'Seattle, Washington, USA',
      startDate: new Date(2021, 12, 10),
      endDate: new Date(2021, 12, 13),
      totalAttendance: 1,
      reviews: [],
    },
  ];

  constructor(private _http: HttpClient) {}

  sortFunction(a: Event, b: Event): number {
    var dateA = new Date(a.startDate).getTime();
    var dateB = new Date(b.startDate).getTime();
    return dateA > dateB ? 1 : -1;
  }

  getEvents(): Event[] {
    // Get events from server, code below requires server call

    return this.events.sort((a, b) => this.sortFunction(a, b));
  }

  getEventsByCategoryAndFandom(
    categoryName: string,
    fandomName: string
  ): Event[] {
    // Get events from server, code below requires server call
    let filterdEvents: Event[] = [];

    this.events.forEach((event) => {
      if (
        event.fandomType.category === categoryName &&
        event.fandomType.name === fandomName
      ) {
        filterdEvents.push(event);
      }
    });

    return filterdEvents.sort((a, b) => this.sortFunction(a, b));
  }

  getEventsById(id: number): Event | null {
    // Get event from server, code below requires server call

    return this.events.find((event) => event.id === id) || null;
  }

  createEvent(event: Event): void {
    // Add event to server, code below requires server call

    this.events.push(event);
  }

  updateEventAttendance(id: number | undefined, isAttending: boolean): void {
    // Update event attendance on server, code below requires server call

    let event = this.events.find((event) => event.id === id);

    if (event) {
      if (isAttending) {
        event.totalAttendance = event.totalAttendance + 1;
      } else {
        event.totalAttendance = event.totalAttendance - 1;
      }
    }
  }

  deleteEvent(index: number): boolean {
    // Delete event from server, code below requires server call

    if (index >= 0) {
      this.events.splice(index, 1);
      return true;
    }

    return false;
  }

  getReviewsByEventId(eventId: number): Review[] | null {
    // Get reviews of a specific event from server, code below requires server call

    return this.events.find((event) => event.id === eventId)?.reviews || null;
  }

  addReviewToEvent(eventId: number, review: Review): void {
    // Add review to a specific event on server, code below requires server call

    let event = this.events.find((event) => event.id === eventId);

    if (event) {
      event.reviews.push(review);
    }
  }

  updateReviewById(eventId: number | null, updatedReview: Review): void {
    // Update review to a specific review on server, code below requires server call

    let event = this.events.find((event) => event.id === eventId);

    if (event) {
      let index = event.reviews.findIndex(
        (review) => review.id === updatedReview.id
      );

      if (index >= 0) {
        event.reviews[index] = updatedReview;
      }
    }
  }

  deleteReview(eventIndex: number, reviewIndex: number): boolean {
    // Delete review from server, code below requires server call

    if (eventIndex >= 0) {
      let event = this.events[eventIndex];
      event.reviews.splice(reviewIndex, 1);
      return true;
    }

    return false;
  }

  updateEventById(eventId: number | undefined, updatedEvent: Event) {
    //Update event in db, code below requires server call

    if (!eventId) return;
    console.log('here in event service', eventId);
  }
}
