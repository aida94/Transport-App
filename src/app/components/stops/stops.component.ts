import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';

import { StopsService } from 'services/stops.service';
import { Stop } from 'models/Stop';

@Component({
  selector: 'app-stops',
  templateUrl: './stops.component.html',
  styleUrls: ['./stops.component.less']
})
export class StopsComponent implements OnInit, DoCheck, OnDestroy {
  constructor(private stopsService: StopsService) { }

  public stops: Stop[];

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.stops = this.stopsService.data$.getValue();
  }

  ngOnDestroy(): void {
    this.stopsService.unsubscribeStop();
  }


}
