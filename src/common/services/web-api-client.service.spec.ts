import { vi } from 'vitest';
import { of } from 'rxjs';

import { WebApiClientService } from './web-api-client.service';
import { categoryDto } from 'src/common/elements/categoryDto';

describe('WebApiClientService', () => {
  let service: WebApiClientService;
  let baseUrl: string = 'https://localhost:7071';
  let httpClient: any;

  beforeEach(() => {
    httpClient = {
      get: vi.fn().mockReturnValue(of([])),
      put: vi.fn().mockReturnValue(of(null)),
      delete: vi.fn().mockReturnValue(of(null)),
    };

    service = new WebApiClientService(baseUrl, httpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve categories from the get method', () => {
    const fakeCats: categoryDto[] = [
      { category: 'cat1', subCategory: 'sub1', id: 'id1' },
      { category: 'cat2', subCategory: 'sub2', id: 'id2' },
    ];

    httpClient.get.mockReturnValue(of(fakeCats));

    service.getCategories().subscribe((cats) => {
      expect(cats.length).toBe(2);
      expect(cats).toEqual(fakeCats);
    });

    expect(httpClient.get).toHaveBeenCalledWith(`${baseUrl}/api/1/category`);
  });

  it('should save a category', () => {
    const fakeCat: categoryDto = {
      category: 'cat1',
      subCategory: 'sub1',
      id: 'id1',
    };

    httpClient.put.mockReturnValue(of(fakeCat));

    service.saveCategory(fakeCat).subscribe((cat) => {
      expect(cat).toEqual(fakeCat);
    });

    expect(httpClient.put).toHaveBeenCalledWith(`${baseUrl}/api/1/category`, fakeCat);
  });

  it('should delete a category', () => {
    const fakeCat: categoryDto = {
      category: 'cat1',
      subCategory: 'sub1',
      id: 'id1',
    };

    httpClient.delete.mockReturnValue(of(fakeCat));

    service.deleteCategory(fakeCat).subscribe((cat) => {
      expect(cat).toEqual(fakeCat);
    });

    expect(httpClient.delete).toHaveBeenCalledWith(`${baseUrl}/api/1/category/${fakeCat.id}`);
  });
});
