import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IEvent } from './shared/index'

@Component({
    selector: 'event-thumbnail',
    template:`
    <div [routerLink]="['/events', event.id]">
    <div class="well hoverwell thumbnail pad-left">
    <h2>{{event.name | uppercase}}</h2>
        <div [ngClass]="getStartTimeClass()" [ngSwitch]="event.time">
            time: {{event?.time}}
            <span *ngSwtichCase="'8:00 am'">(Early start)</span>
            <span *ngSwtichCase="'10:00 am'">(Late start)</span>
            <span *ngSwtichDefault>(Normal start)</span>
        </div>
        <div>date: {{event.date | date:'shortDate'}}</div>
        <div>price: {{event.price | currency:'USD'}}</div>
        <div *ngIf="event?.location">location: {{event?.location?.address}}</div>
        <div [hidden]="!event?.location">city: {{event?.location?.city}}</div>
        <button class="btn btn-primary" (click)="handleClickMe()">Click me!</button>
    </div>
    `,
    styles: [`
    .pad-left{ margin-left: 10px; }
    .well div { color: white}
    .thumbnail { min-height: 250px; }
    .green { color:green !important; }
    .bold{ font-weight: bold; }
    `]
})

export class EventsThumbnailComponent{
    @Input() event: IEvent
    @Output() eventClick = new EventEmitter()

    handleClickMe() {
        this.eventClick.emit(this.event.name)
    }
    
    getStartTimeClass(){
        const isEarlyStart = this.event && this.event.time === '8:00 am'
        return {green: isEarlyStart, bold: isEarlyStart}

        // or we can do this in a string like here or array:
        // if(isEarlyStart = this.event && this.event.time === '8:00 am')
        //     return 'green bold'
        // return ''
    }
}