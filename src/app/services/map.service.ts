import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IMarker } from '../models/marker.model';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  private addMarker = new Subject<IMarker>();
  private deleteSuMarker = new Subject<IMarker>();

  sendAddMessage(marker: IMarker) {
    this.addMarker.next(marker);
  }

  sendDeleteMessage(marker: IMarker) {
    this.deleteSuMarker.next(marker);
  }

  getAddMessage(): Observable<IMarker> {
    return this.addMarker.asObservable();
  }

  getDeleteMessage(): Observable<IMarker> {
    return this.deleteSuMarker.asObservable();
  }
}
