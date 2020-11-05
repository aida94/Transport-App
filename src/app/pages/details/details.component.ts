import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StopService } from 'services/stop.service';
import { LocalStorageService } from 'services/local-storage.service';
import { Stop } from 'models/Stop';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent implements OnInit, AfterViewInit {
  id: number;
  stop: Stop;
  favorite = false;

  constructor(
    private route: ActivatedRoute,
    private stopService: StopService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.favorite = this.localStorageService.existedId(params.id);
    });
  }

  ngAfterViewInit(): void {
    this.stopService.fetchStopData(this.id).subscribe(res => this.stop = res);
  }

  setFavorite(): void {
    this.favorite = !this.favorite;
    this.localStorageService.storeOnLocalStorage(this.stop.id, this.stop.name);
  }

}
