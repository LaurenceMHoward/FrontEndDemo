import { Component, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { categoryDto } from 'src/common/elements/categoryDto';

@Component({
    selector: 'app-category-modal',
    templateUrl: './category-modal.component.html',
    styleUrls: ['./category-modal.component.less'],
    standalone: false
})
export class CategoryModalComponent {
  categoryForm: FormGroup = new FormGroup({
    category: new FormControl(),
    subCategory: new FormControl(),
    id: new FormControl(),
  });

  public mode: string = 'Edit Category Mode';
  public isDeleteDisabled: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CategoryModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    if (data) {
      this.mode = 'Edit Category Mode';
      this.categoryForm = this.fb.group({
        category: [this.data.category, null],
        subCategory: [this.data.subCategory, null],
        id: [this.data.id, null],
      });
    } else {
      this.mode = 'New Category Mode';
      this.categoryForm = this.fb.group({
        category: ['', null],
        subCategory: ['', null],
        id: ['', null],
      });
      this.isDeleteDisabled = true;
    }
  }

  saveCategoryClicked(): void {
    let item = this.getFormGroupCategory();
    this.closeModal({ button: 'save', category: item });
  }

  deleteCategoryClicked(): void {
    let item = this.getFormGroupCategory();
    this.closeModal({ button: 'delete', category: item });
  }

  closeModal(item: any | undefined) {
    this.dialogRef.close(item ?? { button: 'cancel' });
  }

  private getFormGroupCategory(): categoryDto {
    return {
      category: this.getCategoryFromForm(),
      subCategory: this.getSubCategoryFromForm(),
      id: this.getIdFromForm(),
    };
  }

  private getCategoryFromForm(): string {
    return this.categoryForm.controls['category'].value.trim();
  }

  private getSubCategoryFromForm(): string {
    return this.categoryForm.controls['subCategory'].value.trim();
  }

  private getIdFromForm(): string | null {
    let id = this.categoryForm.controls['id'].value;

    if (id) {
      return id;
    }

    return null;
  }
}
