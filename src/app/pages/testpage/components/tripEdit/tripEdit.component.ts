import {Component, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef} from '@angular/core';

import {TripEditService} from './tripEdit.service';
import './tripEdit.loader';

@Component({
  selector: 'feed',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./tripEdit.scss')],
  template: require('./tripEdit.html')
})
export class TripEdit implements AfterViewInit {

  @ViewChild('tripItem')
  el: ElementRef;

  private index:number;

  public trip: Array<Object>;

  constructor(private _tripService: TripEditService) {
  }

  ngOnInit() {
    this._loadTrip();
  }

  ngAfterViewInit() {
    jQuery(this.el.nativeElement).sortable({
      start: function (event, ui) {
        console.log("Old position: " + ui.item.index());
        this.index = ui.item.index();
        console.log("index:" + this.index);
      },
      stop: function (event, ui) {
        console.log("New position: " + ui.item.index());
      }
    });
  }

  expandMessage(message) {
    message.expanded = !message.expanded;
  }

  private _loadTrip() {
    this.trip = this._tripService.getData();
  }
}
