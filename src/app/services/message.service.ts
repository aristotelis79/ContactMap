import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IAddress } from '../models/address.model';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private subject = new Subject<IAddress>();

  sendMessage(contact: IAddress) {
    this.subject.next(contact);
  }

  clearMessages() {
    this.subject.next();
  }

  getMessage(): Observable<IAddress> {
    return this.subject.asObservable();
  }
}
