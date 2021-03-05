import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../core/services/event.service';
import { FandomService } from '../core/services/fandom.service';
import { AddDialogComponent } from '../shared/components/add-dialog/add-dialog.component';
import Category from '../shared/models/category';

@Component({
  selector: 'app-discussion-board',
  templateUrl: './discussion-board.component.html',
  styleUrls: ['./discussion-board.component.sass']
})
export class DiscussionBoardComponent implements OnInit {
  categories: Array<Category> = [];

  constructor(
    private fandomService: FandomService,
    public dialog: MatDialog,
    private router: Router
  ) 
  { }

  ngOnInit(): void {
    this.categories = this.fandomService.getCategories();
  }

  openDialog(): void {
    this.dialog.open(AddDialogComponent, {
      data: {
        title: 'Category',
        categoryName: '',
        isCategory: true
      },
      width: '300px',
      height: '280px',
      autoFocus: false,
      backdropClass: 'material-dialog-backdrop',
    });
  }

  goToCategory(category: string): void {
    this.router.navigate(['discussion-boards', category]);
  }

}
