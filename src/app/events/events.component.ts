import { Component } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Events } from 'src/app/shared/models/events';
 

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  events:Events[] = [];
  
  constructor(private eventsService:EventsService){
    eventsService.getAll().subscribe((serverEvents) => {
      this.events = serverEvents;
    });
  }

}
