import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import './test.loader';
@Component({
  selector: 'test',
  template: require('./test.html'),
  styles:[require('./test.scss')]
})
export class Test implements AfterViewInit {


  constructor() {
  }

  ngAfterViewInit() {

  }


}
