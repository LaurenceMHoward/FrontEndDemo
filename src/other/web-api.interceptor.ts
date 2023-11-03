import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class WebApiInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse && event.status == 200) {
            if (request.method == 'DELETE') {
              this.ShowSnackBar('The category was deleted', 'Success');
            } else if (request.method == 'PUT') {
              if (request.body.id) {
                this.ShowSnackBar('Updated category', 'Success');
              } else {
                this.ShowSnackBar('New category was saved', 'Success');
              }
            }
          }
        },
        error: (error) => {
          if (error.status == 0) {
            this.ShowSnackBar('Could not reach the api', 'Error');
          } else if (error.status == 500) {
            this.ShowSnackBar('Internal Server Error', 'Error');
          } else if (error.status == 400) {
            let message = error.error[Object.keys(error.error)[0]];
            this.ShowSnackBar(message, 'Error');
          } else if (error.status == 404) {
            this.ShowSnackBar('Not Found', 'Error');
          }
        },
      })
    );
  }

  private ShowSnackBar(message: string, action: string): void {
    let configState: MatSnackBarConfig = {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    };

    if (action == 'Success') {
      configState.panelClass = ['green-snackbar'];
    } else {
      configState.panelClass = ['red-snackbar'];
    }

    this.snackBar.open(message, action, configState);
  }
}
