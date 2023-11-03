import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryModalComponent } from './category-modal.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

describe('CategoryModalComponent', () => {
  let component: CategoryModalComponent;
  let fixture: ComponentFixture<CategoryModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [
        CategoryModalComponent,
        {
          provide: MatDialogRef,
          useValue: { category: 'test', subCategory: 'test2', id: 'id3' },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { category: 'test', subCategory: 'test2', id: 'id3' },
        },
      ],
    });

    fixture = TestBed.createComponent(CategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
