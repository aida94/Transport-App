import { Component, OnInit, Input } from '@angular/core';

import { StopDetails } from 'models/StopDetails';
import { DeparturesService } from 'services/departures.service';

@Component({
  selector: 'app-departures',
  templateUrl: './departures.component.html',
  styleUrls: ['./departures.component.less']
})
export class DeparturesComponent implements OnInit {
  departures: StopDetails[];

  @Input() id: number;
  constructor(private departuresService: DeparturesService) { }

  ngOnInit(): void {
    this.departuresService.fetchDeparturesData(this.id).subscribe(res => {
      this.departures = res
      // filter all the departures that did not occured yet and sort them from the earliest
        .filter(e => {
          return new Date(e.plannedWhen).getTime() >= new Date().getTime();
        })
        .sort((a, b) => {

        return new Date(a.plannedWhen).getTime() - new Date(b.plannedWhen).getTime();
      });
    });
  }

}
