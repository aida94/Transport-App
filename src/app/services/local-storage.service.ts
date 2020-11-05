import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

import { FavoriteList } from 'models/interfaces';

export enum CACHE_KEYS {
  FAVORITE_STOPS= 'favorite_stops',
  CACHED_STOPS= 'cached_stops',
  CACHED_ARRIVALS= 'cached_arrivals',
  CACHED_DEPARTURES= 'cached_departures',
}
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  favoriteList: FavoriteList[] = this.storage.get(CACHE_KEYS.FAVORITE_STOPS) || [];

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  // get all data of T from local storage
  public getAll<T>(key: CACHE_KEYS): T[] | undefined {
    const result = this.storage.get(key);
    if (result) {
      return Object.values<T>(result);
    }
    return undefined;
  }

  // get from local storage
  public get<T>(key: CACHE_KEYS, id: string | number): T | undefined {
    const result = this.storage.get(key);
    if (result) {
      return result[id];
    }
    return undefined;
  }

  // set from local storage
  public set(key: CACHE_KEYS, id: string | number, data: any): void {
    const result = this.storage.get(key);
    if (result) {
      result[id] = data;
      this.storage.set(key, result);
    } else {
      const initCache = {
        [id]: data
      };
      this.storage.set(key, initCache);
    }
  }

  public getFavoriteList(): FavoriteList[] {
    // return favorite list from local storage
    return this.favoriteList;
  }

  public existedId(id: number): boolean {
    // find if a specific id exist in local storage
    const existId = this.favoriteList.find((list) => list.id === id);

    return !!existId;
  }

  public storeOnLocalStorage(id: number, name: string): void {
    const currentStopsList: FavoriteList[] = this.storage.get(CACHE_KEYS.FAVORITE_STOPS) || [];

    // remove from local storage if 'id' exist
    if (this.existedId(id)) {
      this.favoriteList = currentStopsList.filter(e => e.id !== id);
      this.storage.set(CACHE_KEYS.FAVORITE_STOPS, this.favoriteList);
      return;
    }

    // add in local storage if 'id' do not exist
    currentStopsList.push({id, name});
    this.favoriteList = currentStopsList;
    this.storage.set(CACHE_KEYS.FAVORITE_STOPS, this.favoriteList);
    return;
  }
}
