import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { categoryDto } from '../../common/elements/categoryDto';
import { Observable, map } from 'rxjs';
import { WEB_API_DEMO_ENDPOINT } from '../../app/app.tokens';

@Injectable({
  providedIn: 'root',
})
export class WebApiClientService {
  private categoryRoute = '/api/1/category';

  constructor(
    @Inject(WEB_API_DEMO_ENDPOINT) private baseUrl: string,
    private httpClient: HttpClient
  ) {}

  getCategories(): Observable<categoryDto[]> {
    let path = this.baseUrl.concat(this.categoryRoute);
    return this.httpClient.get<categoryDto[]>(path);
  }

  saveCategory(categoryItem: categoryDto): Observable<any> {
    let path = this.baseUrl.concat(this.categoryRoute);
    return this.httpClient.put(path, categoryItem);
  }

  deleteCategory(categoryItem: categoryDto): Observable<any> {
    let path = this.baseUrl.concat(
      this.categoryRoute,
      '/',
      categoryItem.id ?? ''
    );
    return this.httpClient.delete(path);
  }
}
