import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { FandomService } from '../../core/services/fandom.service';

@Component({
  selector: 'app-fandom-selection',
  templateUrl: './fandom-selection.component.html',
  styleUrls: ['./fandom-selection.component.sass']
})
export class FandomSelectionComponent implements OnInit {
  categories: Array<string> = [];

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

  goToEventBrowser(): void {
    this.router.navigate(['discussion-boards']);
  }

}
