import { Injectable } from '@angular/core';
import { Events } from 'src/app/shared/models/events';
import { sample_events } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  
  getAll():Events[]{
    return sample_events
  }

  getAllTitleBySearchTerm(searchTerm:string){
    return this.getAll().filter(events => events.title.toLowerCase()
    .includes(searchTerm.toLowerCase()))
  }

  getAllTitleById(eventId:string):Events{
    return this.getAll().find(event => event.id == eventId) ?? new Events();
  }
}
