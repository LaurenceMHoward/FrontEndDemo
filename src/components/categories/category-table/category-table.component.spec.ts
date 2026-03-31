import { vi } from 'vitest';
import { CategoryTableComponent } from './category-table.component';
import { WebApiClientService } from '../../../../src/common/services/web-api-client.service';
import { MatDialog } from '@angular/material/dialog';

describe('CategoryTableComponent', () => {
  it('should create', () => {
    const webApiService = {
      getCategories: vi.fn().mockReturnValue({ subscribe: vi.fn() }),
      saveCategory: vi.fn().mockReturnValue({ subscribe: vi.fn() }),
      deleteCategory: vi.fn().mockReturnValue({ subscribe: vi.fn() }),
    } as unknown as WebApiClientService;
    const matDialog = {
      open: vi.fn().mockReturnValue({ afterClosed: () => ({ subscribe: vi.fn() }) }),
    } as unknown as MatDialog;

    const component = new CategoryTableComponent(webApiService, matDialog);

    expect(component).toBeTruthy();
  });
});
