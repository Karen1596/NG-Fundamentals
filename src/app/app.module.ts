import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavBarComponent } from './nav/navbar.component';
import { TOASTR_TOKEN, Toastr, JQ_TOKEN, CollapsibleWellComponent, SimpleModalComponent, ModalTriggerDirective } from './common/index';
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';
import { Error404Component } from './errors/404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    EventListResolver, 
    EventsThumbnailComponent,
    EventsListComponent,
    LocationValidator,
    EventResolver,
} from './events/index'
import { CreateEventComponent } from './events/create-event.component'
import {
    EventDetailsComponent,
    CreateSessionsComponent,
    SessionListComponent,
    UpvoteComponent,
    VoterService
} from './events/event-details/index'
import { EventsAppComponent } from './events-app.component';
import { DurationPipe, EventService } from './events/shared/index';
import { AuthService } from './user/auth.service';
import { HttpClientModule } from '@angular/common/http';

let toastr:Toastr = window['toastr'];
let jQuery = window['$'];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventsThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionsComponent,
    SessionListComponent,
    SessionListComponent,
    DurationPipe,
    CollapsibleWellComponent,
    SimpleModalComponent,
    LocationValidator,
    ModalTriggerDirective,
    UpvoteComponent
  ],
  providers:[
    EventService, 
    VoterService,
    EventResolver, 
    { 
      provide: TOASTR_TOKEN,
      useValue: toastr
    },
    { 
      provide: JQ_TOKEN,
      useValue: jQuery
    },
    EventListResolver,
    AuthService,
    { 
      provide: 'canDeactivateCreateEvent', 
      useValue: checkDirtyState 
    }
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component:CreateEventComponent) {
  if (component.isDirty) 
    return window.confirm('You have not saved this event, do you really want to cancel?')
  return true
}