import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../core/services/auth.service';
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
  isAdmin = false;

  constructor(
    private _fandomService: FandomService,
    private _authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.categories = this._fandomService.getCategories();
    this._authService.currentUser.subscribe(
      (user) => (this.isAdmin = user?.role === 'admin')
    );
  }

  openCreateCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {
        title: 'Category',
        categoryName: '',
        isCategory: true,
      },
      width: '360px',
      height: '300px',
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.categories = this._fandomService.getCategories();
    });
  }
}
