import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

import { Nullable } from 'models/interfaces';
import { Stop } from 'models/Stop';
import { ApiService } from 'services/api.service';
import { CACHE_KEYS, LocalStorageService } from 'services/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class StopsService {
  data$ = new BehaviorSubject<Nullable<Stop[]>>(null);

  constructor(private api: ApiService, private local: LocalStorageService) { }

  unsubscribeStop(): void {
    // reset data$
    this.data$.next(null);
  }

  public fetchStopsData(searchValue: string): Observable<Stop[]> {
    // reset data$ when you clean your search
    if (!searchValue) {
      this.data$.next(null);
      return;
    }

    return this.api.getStops(searchValue).pipe(
      tap((data: Stop[]) => {
        data.forEach(e => {
          this.local.set(CACHE_KEYS.CACHED_STOPS, e.id, e);
        });
        this.data$.next(data);
      })
    );
  }

}
