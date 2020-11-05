import { Component, OnInit, DoCheck } from '@angular/core';

import { LocalStorageService } from 'services/local-storage.service';
import { FavoriteList } from 'models/interfaces';

@Component({
  selector: 'app-favorite-stops',
  templateUrl: './favorite-stops.component.html',
  styleUrls: ['./favorite-stops.component.less']
})
export class FavoriteStopsComponent implements OnInit, DoCheck {
  favoriteList: FavoriteList[];

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.favoriteList = this.localStorageService.getFavoriteList();
  }

  ngDoCheck(): void {
    this.favoriteList = this.localStorageService.getFavoriteList();
  }

  removeStop(stop: FavoriteList): void {
    this.localStorageService.storeOnLocalStorage(stop.id, stop.name);
  }
}
