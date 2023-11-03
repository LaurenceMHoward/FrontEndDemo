import { TestBed } from '@angular/core/testing';

import { WebApiClientService } from './web-api-client.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { categoryDto } from 'src/poco/categoryDto';
import { WEB_API_DEMO_ENDPOINT } from 'src/app/app.tokens';

describe('WebApiClientService', () => {
  let service: WebApiClientService;
  let httpController: HttpTestingController;
  let baseUrl: string = 'https://localhost:7071';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        WebApiClientService,
        { provide: WEB_API_DEMO_ENDPOINT, useValue: baseUrl },
      ],
    });
    service = TestBed.inject(WebApiClientService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve categories from the get method', () => {
    const fakeCats: categoryDto[] = [
      { category: 'cat1', subCategory: 'sub1', id: 'id1' },
      { category: 'cat2', subCategory: 'sub2', id: 'id2' },
    ];

    service.getCategories().subscribe((cats) => {
      expect(cats.length).toBe(2);
      expect(cats).toEqual(fakeCats);
    });

    const request = httpController.expectOne(`${baseUrl}/api/1/category`);
    expect(request.request.method).toBe('GET');
    request.flush(fakeCats);
  });

  it('should save a category', () => {
    const fakeCat: categoryDto = {
      category: 'cat1',
      subCategory: 'sub1',
      id: 'id1',
    };

    service.saveCategory(fakeCat).subscribe((cats) => {
      expect(cats).toEqual(undefined);
    });

    const request = httpController.expectOne(`${baseUrl}/api/1/category`);
    expect(request.request.method).toBe('PUT');
    request.flush(fakeCat);
  });

  it('should delete a category', () => {
    const fakeCat: categoryDto = {
      category: 'cat1',
      subCategory: 'sub1',
      id: 'id1',
    };

    service.deleteCategory(fakeCat).subscribe((cats) => {
      expect(cats).toEqual(undefined);
    });

    const request = httpController.expectOne(
      `${baseUrl}/api/1/category/${fakeCat.id}`
    );
    expect(request.request.method).toBe('DELETE');
    request.flush(fakeCat);
  });
});
