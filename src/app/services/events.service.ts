import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Events } from 'src/app/shared/models/events';
import { sample_events } from 'src/data';
import { EVENTS_BY_ID, EVENTS_URL } from '../administratorsystem/constants/url';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http:HttpClient ) { }

  
  getAll():Observable <Events[]>{
    return this.http.get<Events[]>(EVENTS_URL);
  }

  getAllTitleById(eventId:string):Observable<Events>{
    return this.http.get<Events>(EVENTS_BY_ID + eventId)
  }
}
