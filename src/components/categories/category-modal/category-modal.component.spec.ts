import { vi } from 'vitest';
import { CategoryModalComponent } from './category-modal.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

describe('CategoryModalComponent', () => {
  it('should create in edit mode when data is provided', () => {
    const mockDialogRef = { close: vi.fn() } as unknown as MatDialogRef<CategoryModalComponent>;
    const data = { category: 'test', subCategory: 'test2', id: 'id3' };
    const component = new CategoryModalComponent(mockDialogRef, data, new FormBuilder());

    expect(component).toBeTruthy();
    expect(component.mode).toBe('Edit Category Mode');
    expect(component.isDeleteDisabled).toBe(false);
  });

  it('should create in new mode when no data is provided', () => {
    const mockDialogRef = { close: vi.fn() } as unknown as MatDialogRef<CategoryModalComponent>;
    const component = new CategoryModalComponent(mockDialogRef, null, new FormBuilder());

    expect(component).toBeTruthy();
    expect(component.mode).toBe('New Category Mode');
    expect(component.isDeleteDisabled).toBe(true);
  });
});
