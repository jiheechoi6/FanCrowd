import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FandomService } from '../../core/services/fandom.service';
import Fandom from 'src/app/shared/models/fandom';
import { AddDialogComponent } from 'src/app/shared/components/add-dialog/add-dialog.component';

@Component({
  selector: 'app-fandom-selection',
  templateUrl: './fandom-selection.component.html',
  styleUrls: ['./fandom-selection.component.sass'],
})
export class FandomSelectionComponent implements OnInit {
  category: string = '';
  fandoms: Fandom[] = [];

  constructor(
    private fandomService: FandomService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.category = this.activatedRoute.snapshot.params['category'];
  }

  ngOnInit(): void {
    this.fandoms = this.fandomService.getFandomsByCategories(this.category);
  }

  openDialog(): void {
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

    dialogRef.afterClosed().subscribe(() => {
      this.fandoms = this.fandomService.getFandomsByCategories(this.category);
    });
  }

  goToEventBrowser(): void {
    this.router.navigate(['discussion-boards']);
  }

  goToEvents(fandom: Fandom): void {
    // TODO
    this.router.navigate(['events', this.category, fandom.name]);
  }
}
