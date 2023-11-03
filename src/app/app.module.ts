import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoryTableComponent } from 'src/components/categories/category-table/category-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CategoryModalComponent } from 'src/components/categories/category-modal/category-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WebApiInterceptor } from 'src/common/interceptors/web-api.interceptor';
//environment constants
import { WEB_API_DEMO_ENDPOINT } from 'src/app/app.tokens';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [AppComponent, CategoryTableComponent, CategoryModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  providers: [
    MatPaginator,
    MatDialog,
    { provide: HTTP_INTERCEPTORS, useClass: WebApiInterceptor, multi: true },
    {
      provide: WEB_API_DEMO_ENDPOINT,
      useValue: environment.endPoints.WebApiDemoEndpoint,
    },
  ],
  bootstrap: [AppComponent, CategoryTableComponent],
})
export class AppModule {}
