import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CategoryTableComponent } from '../components/categories/category-table/category-table.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { WEB_API_DEMO_ENDPOINT } from './app.tokens';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('AppComponent', () => {
  let baseUrl: string = 'https://localhost:7071';
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent, CategoryTableComponent],
      imports: [
        RouterTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatTableModule,
      ],
      providers: [
        CategoryTableComponent,
        { provide: WEB_API_DEMO_ENDPOINT, useValue: baseUrl },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'FrontEndDemo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('FrontEndDemo');
  });
});
