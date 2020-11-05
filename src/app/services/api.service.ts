import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Stop, StopRaw } from 'models/Stop';
import { StopDetails, StopDetailsRaw } from 'models/StopDetails';
import { CACHE_KEYS, LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  /**
   * Get stops from search
   * @param searchValue string
   * @returns Stop[]
   */
  getStops(searchValue: string): Observable<Stop[]> {
    const options = {
      params : {
        query: searchValue,
        fuzzy: 'true',
        poi: 'false',
        addresses: 'false'
      }
    };

    return this.http.get<StopRaw[]>('https://v5.vbb.transport.rest/locations', options)
    .pipe(
      map(response => response.map(raw => new Stop(raw))),
      catchError(error => {
        const stops = this.localStorage.getAll<Stop>(CACHE_KEYS.CACHED_STOPS);
        // when you are offline
        // in case there are stops in local storage, make a filter by search value in CACHED_STOPS
        if (stops) {
          const newStops = stops.filter(e => e.name?.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
          return of(newStops);
        }
        throw error;
      })
    );
  }

  /**
   * Get stop by id
   * @param id number
   * @returns Stop
   */
  getStop(id: number): Observable<Stop> {
    return this.http.get<StopRaw>(`https://v5.vbb.transport.rest/stops/${id}`)
    .pipe(
      map(response => new Stop(response)),
      catchError(error => {
        const stop = this.localStorage.get<Stop>(CACHE_KEYS.CACHED_STOPS, id);
        // when you are offline
        // in case there are stop by given id return that stop
        if (stop) {
          return of(new Stop(stop));
        }
        throw error;
      }
    ));
  }

  /**
   * Get departures by stop id
   * @param id number
   * @returns StopDetails[]
   */
  getDepartures(id: number): Observable<StopDetails[]> {
    const options = {
      params : {
        duration: '30',
        remarks: 'false'
      }
    };

    return this.http.get<StopDetailsRaw[]>(`https://v5.vbb.transport.rest/stops/${id}/departures`, options)
    .pipe(
      map(response => response.map(raw => new StopDetails(raw))),
      catchError(error => {
        const departures = this.localStorage.get<StopDetails[]>(CACHE_KEYS.CACHED_DEPARTURES, id);
        // when you are offline
        // in case there are departures related to given stop id, return those departures
        if (departures) {
          return of(departures);
        }
        throw error;
      })
    );
  }

  /**
   * Get arrivals by stop id
   * @param id number
   * @returns StopDetails[]
   */
  getArrivals(id: number): Observable<StopDetails[]> {
    const options = {
      params : {
        duration: '30',
        remarks: 'false'
      }
    };

    return this.http.get<StopDetailsRaw[]>(`https://v5.vbb.transport.rest/stops/${id}/arrivals`, options)
    .pipe(
      map(response => response.map(raw => new StopDetails(raw))),
      catchError(error => {
        const arrivals = this.localStorage.get<StopDetails[]>(CACHE_KEYS.CACHED_ARRIVALS, id);
        // when you are offline
        // in case there are arrivals related to given stop id, return those arrivals
        if (arrivals) {
          return of(arrivals);
        }
        throw error;
      })
    );
  }

}
