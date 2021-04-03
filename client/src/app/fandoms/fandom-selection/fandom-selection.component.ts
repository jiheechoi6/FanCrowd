import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FandomService } from '../../core/services/fandom.service';
import Fandom from 'src/app/shared/models/fandom';
import { AddDialogComponent } from 'src/app/shared/components/add-dialog/add-dialog.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-fandom-selection',
  templateUrl: './fandom-selection.component.html',
  styleUrls: ['./fandom-selection.component.sass'],
})
export class FandomSelectionComponent implements OnInit {
  category: string = '';
  fandoms: Fandom[] = [];
  isLoading = true;

  constructor(
    private _fandomService: FandomService,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.category = params['category'];
      this.fetchFandoms();
    });
  }

  fetchFandoms() {
    this.isLoading = true;
    this._fandomService
      .getFandomsByCategories(this.category)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        (fandoms) => {
          this.fandoms = fandoms;
        },
        (err) => {
          if (err.status === 404) {
            this._router.navigate(['/fandoms']);
          }
        }
      );
  }

  openCreateFandomDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: {
        title: 'Fandom in ' + this.category,
        categoryName: this.category,
        isCategory: false,
      },
      width: '360px',
      height: '300px',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((newFandom: Fandom) => {
      if (newFandom) {
        this.fetchFandoms();
      }
    });
  }
}
