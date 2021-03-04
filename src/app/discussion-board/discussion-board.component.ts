import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../core/services/event.service';
import { FandomService } from '../core/services/fandom.service';
import Category from '../shared/models/category';

@Component({
  selector: 'app-discussion-board',
  templateUrl: './discussion-board.component.html',
  styleUrls: ['./discussion-board.component.sass']
})
export class DiscussionBoardComponent implements OnInit {
  categories: Array<Category> = [];

  constructor( 
    private eventService: EventService,
    private fandomService: FandomService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) 
  { }

  ngOnInit(): void {
    this.categories = this.fandomService.getCategories();
  }

  openDialog(): void {
    // const dialogRef = this.dialog.open(EventCreateDialogComponent, {
    //   data: {username: this.username},
    //   width: '800px',
    //   maxHeight: '90vh',
    // });

    // dialogRef.afterClosed().subscribe((newEvent: Event) => {
    //   if (newEvent) {
    //     this.events = this.eventService.getEvents();
    //   }
    // });

    // TODO: Implement this
  }

  goToCategory(category: string): void {
    this.router.navigate(['discussion-boards', category]);
  }

}
