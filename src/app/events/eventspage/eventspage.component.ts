import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events.service';
import { Events } from 'src/app/shared/models/events';

@Component({
  selector: 'app-eventspage',
  templateUrl: './eventspage.component.html',
  styleUrls: ['./eventspage.component.css']
})
export class EventspageComponent {
  events!: Events;
  constructor(activatedRoute:ActivatedRoute, eventsService:EventsService){
    activatedRoute.params.subscribe((params) =>{
      if(params.id)
      eventsService.getAllTitleById(params.id).subscribe(serverEvents =>{
        this.events = serverEvents
      });
    })
  }

}
