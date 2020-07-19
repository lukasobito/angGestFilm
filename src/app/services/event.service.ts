import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private client: HttpClient) { }

  getAll(url: string): Observable<Event>{
    return this.client.get<Event>(url);
  }
}
