import { Observable, of } from "rxjs";
import { Injectable, Inject } from '@angular/core';
import { TOASTR_TOKEN, IToastr } from '../common/toastr.service';

@Injectable({
  providedIn: 'root'
})

export class HttpHelper {

  constructor(@Inject(TOASTR_TOKEN) private toastr: IToastr) { }

  handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      if (error) {
        if (error.error) {
          this.toastr.error(error.error, 'Something Wrong Happened');
        }
        else if (error.message) {
          this.toastr.error(error.message, 'Something Wrong Happened');
        }
      }
      return of(result as T);
    };
  }
}