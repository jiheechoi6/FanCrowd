import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { EventService } from 'src/app/core/services/event.service';
import EventDTO from 'src/app/shared/models/event-dto';
import FandomPost from 'src/app/shared/models/fandom-post';
import UserDTO from 'src/app/shared/models/user-dto';

@Component({
  selector: 'app-fandom-detail',
  templateUrl: './fandom-detail.component.html',
  styleUrls: ['./fandom-detail.component.sass'],
})
export class FandomDetailComponent implements OnInit {
  eventsForFandom: EventDTO[] = [];
  fandomCategory: string = '';
  fandomName: string = '';
  postsForEvent: FandomPost[] = [
    {
      comments: [],
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      datePosted: new Date(),
      numDislikes: 10,
      numLikes: 30,
      postedBy: {
        username: 'user1',
        profileUrl:
          'https://mocah.org/uploads/posts/5420641-moon-night-black-space-halloween-star-supermoon-nature-sterne-super-moon-galaxy-universe-sky-nightime-creative-commons-images.jpg',
        role: 'user',
      },
      title: 'Lorem ipsum dolor sit amet',
    },
  ];
  loggedInUser: UserDTO | null = null;

  constructor(
    private _authService: AuthService,
    private _eventService: EventService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.fandomCategory = params['category'].toLowerCase();
      this.fandomName = params['fandom'].toLowerCase();

      const events = this._eventService.getEventsByCategoryAndFandom(
        'books',
        'harry potter'
      );

      this.eventsForFandom = this._eventService.convertEventsToEventDTOs(
        events
      );
    });

    this._authService.currentUser.subscribe(
      (user) => (this.loggedInUser = user)
    );
  }

  joinFandom() {}

  createFandomPost() {}
}
