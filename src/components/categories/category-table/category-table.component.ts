import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { categoryDto } from 'src/common/elements/categoryDto';
import { WebApiClientService } from 'src/common/services/web-api-client.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { CategoryModalComponent } from 'src/components/categories/category-modal/category-modal.component';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.less'],
})
export class CategoryTableComponent implements OnInit, AfterViewInit {
  categories: categoryDto[] = [];
  displayedColumns: string[] = ['category', 'Subcategory'];
  dataSource: MatTableDataSource<categoryDto> =
    new MatTableDataSource<categoryDto>();
  resultsLength: number = 0;

  // for dialogue and subsequent
  clickedRow!: categoryDto | null;
  private dialogConfig = new MatDialogConfig();
  private dialogue: MatDialogRef<CategoryModalComponent, any> | undefined;

  constructor(
    private webApiService: WebApiClientService,
    private matDialog: MatDialog
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  rowClicked(item: categoryDto | null): void {
    this.clickedRow = item;
    this.dialogConfig.id = 'app-category-modal';
    this.dialogConfig.height = '340px';
    this.dialogConfig.width = '650px';
    this.dialogConfig.position = { top: '10%' };
    this.dialogConfig.data = item;
    this.dialogue = this.matDialog.open(
      CategoryModalComponent,
      this.dialogConfig
    );

    this.dialogue.afterClosed().subscribe((result) => {
      let button = result.button;
      if (button == 'save') {
        this.saveCategory(result.category);
      } else if (button == 'delete') {
        this.deleteCategory(result.category);
      }
    });
  }

  ngOnInit(): void {
    this.webApiService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.populateTable();
      },
    });
  }

  private populateTable() {
    this.dataSource = new MatTableDataSource<categoryDto>(this.categories);
    this.resultsLength = this.categories.length;
    this.dataSource.paginator = this.paginator;
  }

  private saveCategory(item: categoryDto): void {
    this.webApiService.saveCategory(item).subscribe({
      next: (newCategory: categoryDto) => {
        if (newCategory.id) {
          this.setSavedNewOrUpdate(newCategory);
        }
      },
    });
  }

  private deleteCategory(item: categoryDto): void {
    this.webApiService.deleteCategory(item).subscribe({
      next: (deletedEntry: categoryDto) => {
        if (deletedEntry.id) {
          const index = this.categories
            .map((x) => x.id)
            .indexOf(deletedEntry.id);
          if (index > -1) {
            this.categories.splice(index, 1);
            this.populateTable();
          }
        }
      },
    });
  }

  private setSavedNewOrUpdate(newCategory: categoryDto): void {
    const index = this.categories.map((x) => x.id).indexOf(newCategory.id);
    if (index < 0) {
      this.categories.push(newCategory);
    } else {
      this.categories[index].category = newCategory.category;
      this.categories[index].subCategory = newCategory.subCategory;
    }

    this.categories.sort(
      (a, b) =>
        a.category.localeCompare(b.category) ||
        a.subCategory.localeCompare(b.subCategory)
    );

    this.populateTable();
  }

  ngAfterViewInit(): void {
    document.onclick = (args: any): void => {
      if (args.target.tagName === 'BODY') {
        this.dialogue?.close();
      }
    };
  }
}
