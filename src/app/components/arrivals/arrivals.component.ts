import { Component, OnInit, Input } from '@angular/core';

import { StopDetails } from 'models/StopDetails';
import { ArrivalsService } from 'services/arrivals.service';

@Component({
  selector: 'app-arrivals',
  templateUrl: './arrivals.component.html',
  styleUrls: ['./arrivals.component.less']
})
export class ArrivalsComponent implements OnInit {
  arrivals: StopDetails [];

  @Input() id: number;
  constructor(private arrivalsService: ArrivalsService) { }

  ngOnInit(): void {
    this.arrivalsService.fetchArrivalsData(this.id).subscribe(res => {
      // filter all the arrivals that did not occured yet and sort them from the earliest
      this.arrivals = res
        .filter(e => {
          return new Date(e.plannedWhen).getTime() >= new Date().getTime();
        })
        .sort((a, b) => {

        return new Date(a.plannedWhen).getTime() - new Date(b.plannedWhen).getTime();
      });
    });
  }

}
