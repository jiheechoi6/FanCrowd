import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import Event from 'src/app/shared/models/event';
import Review from 'src/app/shared/models/review';
import EventDTO from 'src/app/shared/models/event-dto';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  today = new Date();

  events: Event[] = [
    {
      _id: "1",
      fandom: {
        _id: "11",
        category: {
          _id: "1",
          name: "Books",
          backgroundURL: ""
        },
        name: 'Harry Potter',
        backgroundURL: '',
        createdAt: new Date(),
      },
      name: 'Comic Con',
      description: `A comic book convention or comic con is an event with a primary focus on comic books and comic book culture, in which comic book fans gather to meet creators, experts, and each other. Commonly, comic conventions are multi-day events hosted at convention centers, hotels, or college campuses.`,
      postedBy: {
        username: "user1",
        profileURL: "https://mocah.org/uploads/posts/5420641-moon-night-black-space-halloween-star-supermoon-nature-sterne-super-moon-galaxy-universe-sky-nightime-creative-commons-images.jpg",
        role: "user"
      },
      location: 'Toronto, Ontario, Canada',
      startDate: new Date(2021, 10, 12),
      endDate: new Date(2021, 10, 14),
      totalAttendance: 2,
    },
    {
      _id: "2",
      fandom: {
        _id: "30",
        category: {
          _id: "5",
          name: "Technology",
          backgroundURL: ""
        },
        name: 'Apple',
        backgroundURL: '',
        createdAt: new Date(),
      },
      name: 'World Expo',
      description: `Our once-in-a-lifetime celebration – the largest event ever staged in the Arab world – is set to welcome 190 participating countries, and millions of visitors from across the globe. Here they will experience warm Emirati hospitality at its finest, as well as the UAE’s values of inclusion, tolerance and cooperation. Youth are at the heart of our World Expo. That’s why Expo 2020 aspires to create a meaningful legacy that will benefit generations to come, both locally and globally, spanning everything from innovations and architecture to friendships and business opportunities.`,
      postedBy: {
        username: "user2",
        profileURL: "https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg",
        role: "user"
      },
      location: 'Dubai, UAE',
      startDate: new Date(2021, 5, 12),
      endDate: new Date(2021, 5, 14),
      totalAttendance: 2,
    },
    {
      _id: "3",
      fandom: {
        _id: '1',
        category: {
          _id: '2',
          name: "Movies",
          backgroundURL: ""
        },
        name: 'Avengers',
        backgroundURL: '',
        createdAt: new Date(),
      },
      name: 'Marvel Studios',
      description: `Marvel Studios, LLC is an American film and television studio that is a subsidiary of Walt Disney Studios, a division of The Walt Disney Company. Marvel Studios is known for the production of the Marvel Cinematic Universe films, based on characters that appear in Marvel Comics publications.`,
      postedBy: {
        username: "user2",
        profileURL: "https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg",
        role: "user"
      },
      location: 'San Fransico, California, USA',
      startDate: new Date(2021, 6, 12),
      endDate: new Date(2021, 7, 14),
      totalAttendance: 1,
    },
    {
      _id: "4",
      fandom: {
        _id: '21',
        category: {
          _id: '3',
          name: "Games",
          backgroundURL: ""
        },
        name: 'God of War',
        backgroundURL: '',
        createdAt: new Date(),
      },
      name: 'Sony Game Release',
      description: `God of War is an action-adventure game franchise created by David Jaffe at Sony's Santa Monica Studio. It began in 2005 on the PlayStation 2 video game console, and has become a flagship title for the PlayStation brand, consisting of eight games across multiple platforms with a ninth currently in development.`,
      postedBy: {
        username: "user2",
        profileURL: "https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg",
        role: "user"
      },
      location: 'Los Angeles, California, USA',
      startDate: new Date(2021, 4, 8),
      endDate: new Date(2021, 4, 11),
      totalAttendance: 1,
    },
    {
      _id: "5",
      fandom: {
        _id: '9',
        category: {
          _id: '1',
          name: "Books",
          backgroundURL: ""
        },
        name: 'Harry Potter',
        backgroundURL: '',
        createdAt: new Date(),
      },
      name: 'J.K Rowling Meet & Greet',
      description: `Harry Potter is a series of seven fantasy novels written by British author, J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.`,
      postedBy: {
        username: "user1",
        profileURL: "https://mocah.org/uploads/posts/5420641-moon-night-black-space-halloween-star-supermoon-nature-sterne-super-moon-galaxy-universe-sky-nightime-creative-commons-images.jpg",
        role: "user"
      },
      location: 'Vancouver, British Columbia, Canada',
      startDate: new Date(2021, 9, 12),
      endDate: new Date(2021, 9, 15),
      totalAttendance: 3,
    },
    {
      _id: "6",
      fandom: {
        _id: '17',
        category: {
          _id: '4',
          name: "Anime",
          backgroundURL: ""
        },
        name: 'One Punch Man',
        backgroundURL: '',
        createdAt: new Date(),
      },
      name: 'Anime-Fest',
      description: `One-Punch Man is a Japanese superhero franchise created by the artist ONE. It tells the story of Saitama, a superhero who can defeat any opponent with a single punch but seeks to find a worthy opponent after growing bored by a lack of challenge due to his overwhelming strength.`,
      postedBy: {
        username: "user2",
        profileURL: "https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg",
        role: "user"
      },
      location: 'New York City, New York, USA',
      startDate: new Date(2021, 7, 30),
      endDate: new Date(2021, 8, 1),
      totalAttendance: 2,
    },
    {
      _id: "7",
      fandom: {
        _id: '26',
        category: {
          _id: '6',
          name: "Sports",
          backgroundURL: "https://wallpaperaccess.com/full/552032.jpg"
        },
        name: 'Soccer',
        backgroundURL: '',
        createdAt: new Date(),
      },
      name: 'FIFA World Cup Party',
      description: `The FIFA World Cup, often simply called the World Cup, is an international association football competition contested by the senior men's national teams of the members of the Fédération Internationale de Football Association, the sport's global governing body.`,
      postedBy: {
        username: "user2",
        profileURL: "https://cdn.boatinternational.com/bi_prd/bi/library_images/7wEiKNSS42Kc3TPXmhMg_The-Flying-Dutchman-AdobeStock.jpg",
        role: "user"
      },
      location: 'Westminister, London, United Kingdom',
      startDate: new Date(2021, 11, 3),
      endDate: new Date(2021, 11, 8),
      totalAttendance: 1,
    },
    {
      _id: "8",
      fandom: {
        _id: '15',
        category: {
          _id: '3',
          name: "Shows",
          backgroundURL: "https://www.canvasandwall.co.za/wp-content/uploads/2020/04/TV-Background-3D-wallpaper.jpg"
        },
        name: 'Game of Thrones',
        backgroundURL: '',
        createdAt: new Date(),
      },
      name: 'New HBO Show Press Release',
      description: `Home Box Office is an American pay television network owned by WarnerMedia Studios & Networks and the flagship property of parent subsidiary Home Box Office, Inc.`,
      postedBy: {
        username: "user1",
        profileURL: "https://mocah.org/uploads/posts/5420641-moon-night-black-space-halloween-star-supermoon-nature-sterne-super-moon-galaxy-universe-sky-nightime-creative-commons-images.jpg",
        role: "user"
      },
      location: 'Seattle, Washington, USA',
      startDate: new Date(2021, 12, 10),
      endDate: new Date(2021, 12, 13),
      totalAttendance: 1,
    },
  ];

  constructor(private _http: HttpClient) {}

  sortFunction(a: Event, b: Event): number {
    var dateA = new Date(a.startDate).getTime();
    var dateB = new Date(b.startDate).getTime();
    return dateA > dateB ? 1 : -1;
  }

  getEvents() {
    // return this.events.sort((a, b) => this.sortFunction(a, b));
    return this._http.get<Event[]>('/api/events');
  }

  getEventsByCategoryAndFandom(categoryName: string, fandomName: string) {
    const dashedCategoryName = categoryName.split(' ').join('-');
    const dashedFandomName = fandomName.split(' ').join('-');

    return this._http.get<Event[]>(
      `/api/events/${dashedCategoryName}/${dashedFandomName}`
    );
  }

  getEventById(id: string) {
    // return this.events.find((event) => event._id === id) || null;
    return this._http.get<Event>(`/api/events/${id}`);
  }

  createEvent(event: Event): void {
    // Add event to server, code below requires server call

    event._id = "9999";
    this.events.push(event);
  }

  getAttendees() {
    // return this.events.sort((a, b) => this.sortFunction(a, b));
    return this._http.get<Event[]>('/api/events');
  }

  updateEventAttendance(id: string | undefined, isAttending: boolean): void {
    // Update event attendance on server, code below requires server call

    let event = this.events.find((event) => event._id === id);

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

  getReviewsByEventId(eventId: string) {
    return this._http.get<Review[]>(`/api/events/reviews/${eventId}`);
  }

  addReviewToEvent(eventId: number, review: Review): void {
    // Add review to a specific event on server, code below requires server call
  }

  updateReviewById(eventId: number | null, updatedReview: Review): void {
    // Update review to a specific review on server, code below requires server call
  }

  deleteReview(reviewId: string) {
    // Delete review from server, code below requires server call
    console.log("Here-4", reviewId);
    return this._http.delete(`/api/events/reviews/${reviewId}`);
  }

  updateEventById(eventId: string | undefined, updatedEvent: Event) {
    //Update event in db, code below requires server call

    if (!eventId) return;

    const eventIndex = this.events.findIndex((event) => event._id === eventId);
    this.events[eventIndex] = updatedEvent;
  }
}
