import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private client:HttpClient) { }

  getAll(url: string): Observable<Group>{
    return this.client.get<Group>(url);
  }
}
