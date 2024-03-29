import { Injectable } from '@angular/core';
import { Events } from 'src/app/shared/models/events';
import { sample_events } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  
  getAll():Events[]{
    return sample_events;
  }

  getAllTitleById(eventId:string):Events{
    return this.getAll().find(events => events.id == eventId) ?? new Events();
  }
}
