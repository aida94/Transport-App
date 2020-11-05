import { Component, OnInit, Input } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

import { StopDetails } from 'models/StopDetails';

@Component({
  selector: 'app-stop-details',
  templateUrl: './stop-details.component.html',
  styleUrls: ['./stop-details.component.less']
})
export class StopDetailsComponent implements OnInit {
  delay: number;
  remainTime: string;

  @Input() stop: StopDetails;
  constructor() { }

  ngOnInit(): void {
    const delayInAbsolute =  Math.abs(this.stop.delay);
    // convert delay from second to min
    this.delay = delayInAbsolute / 60;

    // find the distance from arrival/departure time to now
    this.remainTime = formatDistanceToNow(new Date(this.stop.plannedWhen));
  }

}
