import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs';

import { Nullable } from 'models/interfaces';
import { StopDetails } from 'models/StopDetails';
import { ApiService } from 'services/api.service';
import { CACHE_KEYS, LocalStorageService } from 'services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DeparturesService {
  readonly data$ = new BehaviorSubject<Nullable<StopDetails[]>>(null);

  constructor(private api: ApiService, private local: LocalStorageService) { }

  public fetchDeparturesData(id: number): Observable<StopDetails[]> {
    return this.api.getDepartures(id).pipe(
      tap((data: StopDetails[]) => {
        this.local.set(CACHE_KEYS.CACHED_DEPARTURES, id, data);
        this.data$.next(data);
      })
    );
  }
}
