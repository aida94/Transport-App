import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { AppRoutingModule } from 'app-routing.module';
import { AppComponent } from 'app.component';
import { LocalStorageService } from 'services/local-storage.service';
import { DetailsComponent } from 'pages/details/details.component';
import { HomepageComponent } from 'pages/homepage/homepage.component';
import { PageNotFoundComponent } from 'pages/page-not-found/page-not-found.component';
import { FooterComponent } from 'components/footer/footer.component';
import { NavbarComponent } from 'components/navbar/navbar.component';
import { SearchComponent } from 'components/search/search.component';
import { FavoriteStopsComponent } from 'components/favorite-stops/favorite-stops.component';
import { StopsComponent } from 'components/stops/stops.component';
import { DeparturesComponent } from 'components/departures/departures.component';
import { ArrivalsComponent } from 'components/arrivals/arrivals.component';
import { StopDetailsComponent } from 'components/stop-details/stop-details.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FooterComponent,
    NavbarComponent,
    PageNotFoundComponent,
    SearchComponent,
    FavoriteStopsComponent,
    StopsComponent,
    DetailsComponent,
    DeparturesComponent,
    ArrivalsComponent,
    StopDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NzGridModule,
    NzInputModule,
    NzIconModule,
    NzSkeletonModule,
    HttpClientModule,
    StorageServiceModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [LocalStorageService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
