import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FandomService } from '../core/services/fandom.service';
import { AddDialogComponent } from '../shared/components/add-dialog/add-dialog.component';
import Category from '../shared/models/category';

@Component({
  selector: 'app-fandoms',
  templateUrl: './fandoms.component.html',
  styleUrls: ['./fandoms.component.sass'],
})
export class FandomsComponent implements OnInit {
  categories: Array<Category> = [];

  constructor(
    private fandomService: FandomService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories = this.fandomService.getCategories();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {
        title: 'Category',
        categoryName: '',
        isCategory: true,
      },
      width: '360px',
      height: '300px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.categories = this.fandomService.getCategories();
    });
  }

  goToCategory(category: string): void {
    this.router.navigate(['fandoms', category]);
  }
}
