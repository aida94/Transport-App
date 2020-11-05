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
export class StopService {
  readonly data$ = new BehaviorSubject<Nullable<Stop>>(null);

  constructor(private api: ApiService, private local: LocalStorageService) { }

  public fetchStopData(id: number): Observable<Stop> {
    return this.api.getStop(id).pipe(
      tap((data: Stop) => {
        this.local.set(CACHE_KEYS.CACHED_STOPS, id,  data);
        this.data$.next(data);
      })
    );
  }

}
