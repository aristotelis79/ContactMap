import { Injectable } from '@angular/core';
import { IAddress } from '../models/address.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from "rxjs/operators";
import { handleError } from './http-helpers';

@Injectable({
  providedIn: 'root'
})
export class AddreessService {

  constructor(private http: HttpClient) { }

  createAddress(address: IAddress) {
    var options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }
    return this.http.post<IAddress>("/api/addresses", address, options)
      .pipe(catchError(handleError<IAddress>('createAddress')));//TODO
  }
}
