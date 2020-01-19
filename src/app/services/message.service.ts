import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IAddress } from '../models/address.model';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private addSubject = new Subject<IAddress>();
  private deleteSubject = new Subject<IAddress>();

  sendAddMessage(address: IAddress) {
    this.addSubject.next(address);
  }

  sendDeleteMessage(address: IAddress) {
    this.deleteSubject.next(address);
  }

  getAddMessage(): Observable<IAddress> {
    return this.addSubject.asObservable();
  }

  getDeleteMessage(): Observable<IAddress> {
    return this.deleteSubject.asObservable();
  }
}
