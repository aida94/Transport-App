import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import {fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

import { StopsService} from 'services/stops.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild('input') input: ElementRef;

  constructor(private stopsService: StopsService) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          if (this.input.nativeElement.value) {
            this.stopsService.fetchStopsData(this.input.nativeElement.value).subscribe();
          } else {
            this.stopsService.fetchStopsData(this.input.nativeElement.value);
          }

        })
      )
      .subscribe();
  }
}
