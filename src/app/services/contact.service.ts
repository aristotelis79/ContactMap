import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IContact } from '../models/contact.model';
import { catchError } from "rxjs/operators";
import { HttpHelper } from './http-helpers';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient,
    private httHelper: HttpHelper) { }

  getContacts(): Observable<IContact[]> {
    return this.http.get<IContact[]>("/api/contacts")
      .pipe(catchError(this.httHelper.handleError<IContact[]>('getContacts', [])));
  }

  createContact(contact: IContact) {
    var options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }
    return this.http.post<IContact>("/api/contacts", contact, options)
      .pipe(catchError(this.httHelper.handleError<IContact[]>('createContact', [])));
  }

  deleteContact(id: number) {
    return this.http.delete<string>(`/api/contacts/${id}`)
      .pipe(catchError(this.httHelper.handleError<string>('deleteContact')));
  }
}