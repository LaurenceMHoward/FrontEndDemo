import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTableComponent } from './category-table.component';
import { WebApiClientService } from 'src/services/web-api-client.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { WEB_API_DEMO_ENDPOINT } from 'src/app/app.tokens';

describe('CategoryTableComponent', () => {
  let component: CategoryTableComponent;
  let fixture: ComponentFixture<CategoryTableComponent>;
  let baseUrl: string = 'https://localhost:7071';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WebApiClientService,
        { provide: WEB_API_DEMO_ENDPOINT, useValue: baseUrl },
      ],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatTableModule,
      ],
      declarations: [CategoryTableComponent],
    });
    fixture = TestBed.createComponent(CategoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
