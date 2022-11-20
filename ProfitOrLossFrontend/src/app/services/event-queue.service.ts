import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { AppEvent } from '../models/app.event';
import { AppEventType } from '../models/app.event.type';

@Injectable({
  providedIn: 'root'
})
export class EventQueueService {
private eventBrocker = new Subject<AppEvent<any>>()

On(eventType: AppEventType): Observable<AppEvent<any>>{
  return this.eventBrocker.pipe(filter(event => event.type === eventType));
}
dispatch<T>(event: AppEvent<T>): void {
  this.eventBrocker.next(event);
}

  constructor() { }
}
