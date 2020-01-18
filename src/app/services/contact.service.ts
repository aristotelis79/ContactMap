import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IContact } from '../models/contact.model';
import { catchError } from "rxjs/operators";
import { handleError } from './http-helpers';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContacts(): Observable<IContact[]> {
    return this.http.get<IContact[]>("/api/contacts")
      .pipe(catchError(handleError<IContact[]>('getContacts', [])));
  }

  createContact(contact: IContact) {
    var options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }
    return this.http.post<IContact>("/api/contacts", contact, options)
      .pipe(catchError(handleError<IContact[]>('createContact', [])));
  }
}