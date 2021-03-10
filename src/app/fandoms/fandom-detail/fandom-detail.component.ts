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
  postsForEvent: FandomPost[] = [];
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
