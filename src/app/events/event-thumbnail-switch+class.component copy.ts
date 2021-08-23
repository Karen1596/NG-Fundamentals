import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'event-thumbnail',
    template:`
    <div>
    <div class="well hoverwell thumbnail pad-left">
    <h2>{{event.name}}</h2>
        <div [class.green]="event?.time === '8:00 am'" [ngSwitch]="event.time">
            time: {{event?.time}}
            <span *ngSwtichCase="'8:00 am'">(Early start)</span>
            <span *ngSwtichCase="'10:00 am'">(Late start)</span>
            <span *ngSwtichDefault>(Normal start)</span>
        </div>
        <div>date: {{event.date}}</div>
        <div>price: \${{event.price}}</div>
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
    @Input() event: any
    @Output() eventClick = new EventEmitter()

    somePropetry:any = "some value"

    handleClickMe() {
        this.eventClick.emit(this.event.name)
    }
    
    logFoo() { 
        console.log('foo')
    }
}