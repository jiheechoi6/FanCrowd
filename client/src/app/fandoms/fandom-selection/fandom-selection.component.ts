import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FandomService } from '../../core/services/fandom.service';
import Fandom from 'src/app/shared/models/fandom';
import { AddDialogComponent } from 'src/app/shared/components/add-dialog/add-dialog.component';
import { finalize } from 'rxjs/operators';
import Category from 'src/app/shared/models/category';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-fandom-selection',
  templateUrl: './fandom-selection.component.html',
  styleUrls: ['./fandom-selection.component.sass'],
})
export class FandomSelectionComponent implements OnInit, OnDestroy {
  categoryName: string = '';
  fandoms: Fandom[] = [];
  isLoading = true;
  category!: Category;
  userSubscription!: Subscription;
  isAdmin = false;

  constructor(
    private _fandomService: FandomService,
    private _activatedRoute: ActivatedRoute,
    public _dialog: MatDialog,
    private _router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this.categoryName = params['category'];
      this.fetchComponentInfo();
    });

    this.userSubscription = this._authService.currentUser.subscribe(
      (user) => (this.isAdmin = user?.role === 'admin')
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  fetchComponentInfo() {
    this._fandomService
      .getFandomsByCategories(this.categoryName)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        (fandomsAndCategory) => {
          this.fandoms = fandomsAndCategory.fandoms;
          this.category = fandomsAndCategory.category;
        },
        (err) => {
          if (err.status === 404) {
            this._router.navigate(['/fandoms']);
          }
        }
      );
  }

  openCreateFandomDialog(): void {
    const dialogRef = this._dialog.open(AddDialogComponent, {
      data: {
        title: 'Fandom',
        categoryId: this.category?._id,
        isCategory: false,
      },
      width: '360px',
      height: '300px',
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((newFandom: Fandom) => {
      if (newFandom) {
        this.fandoms.push(newFandom);
      }
    });
  }

  deleteCategory() {
    this._fandomService
      .deleteCategoryById(this.category?._id)
      .subscribe(() => this._router.navigate(['/fandoms']));
  }

  openDeleteCategoryDialog() {
    this._dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Delete Category Confirmation',
        details:
          'Are you sure you want to delete this category? All associated fandoms, posts and comments will be removed as well',
        onConfirmCb: this.deleteCategory.bind(this),
      },
      autoFocus: false,
      width: '450px',
      disableClose: true,
    });
  }

  openEditCategoryDialog() {
    const dialogRef = this._dialog.open(AddDialogComponent, {
      data: {
        title: 'Category',
        isCategory: true,
        isEditing: true,
        category: this.category,
      },
      width: '360px',
      height: '300px',
      autoFocus: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((updatedCategory: Category) => {
      if (updatedCategory) {
        this._router.navigate([
          '/fandoms',
          updatedCategory.name.split(' ').join('-'),
        ]);
      }
    });
  }
}
