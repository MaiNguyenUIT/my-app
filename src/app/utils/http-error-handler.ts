import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleHttpError(error: HttpErrorResponse) {
  let errorMessage = 'An unknown error occurred!';

  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = `${error.error.message}`;
  } else {
    // Server-side error
    if (error.error?.message) {
      errorMessage = `${error.error.message}`;
    } else {
      errorMessage = `Error ${error.status}: ${error.message}`;
    }
  }

  // Optional: log to console or toast
  alert(errorMessage);

  return throwError(() => new Error(errorMessage));
}
