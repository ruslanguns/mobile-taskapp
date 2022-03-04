import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { control, LatLng, Map, marker, Marker, tileLayer } from 'leaflet';
import { fromEvent, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  tap,
} from 'rxjs/operators';
import { GeocodingService } from 'src/app/services/geo-coding.service';
import { ClassEnum, ReverseResult, SearchResult } from '../../interfaces';
import mapLayers from './config/map-layers';

@Component({
  selector: 'app-get-location',
  templateUrl: './get-location.component.html',
  styleUrls: ['./get-location.component.scss'],
})
export class GetLocationComponent implements AfterViewInit, OnDestroy {
  @ViewChild('search') searchInput: ElementRef;

  map: Map;
  myMarker: Marker;
  geo: Geolocation = window.navigator.geolocation;
  geocoding: Subscription;
  searchResults: SearchResult[] = [];
  searchTerm: string;
  metadata: Record<string, any> | undefined;
  foundAddress: SearchResult | undefined;
  loading = false;

  constructor(
    private geocodingService: GeocodingService,
    private modalController: ModalController
  ) {}

  get myLonLat() {
    return this.metadata;
  }

  async closeModal() {
    this.modalController.dismiss({
      data: {
        myLonLat: this.myLonLat || { data: null },
      },
    });
  }

  ngAfterViewInit() {
    this.map = new Map('map', {
      zoom: 2,
      center: [39.94, -3.85],
      layers: [
        tileLayer(mapLayers[0].url, {
          maxZoom: 18,
          attribution: mapLayers[0].attribution,
        }),
      ],
    });

    const baseLayers = mapLayers.reduce(
      (acc, theme) => ({
        ...acc,
        [theme.name]: tileLayer(theme.url, {
          maxZoom: 18,
          attribution: theme.attribution,
        }),
      }),
      {}
    );

    control.layers(baseLayers).addTo(this.map);

    this.map.on('click', (e: any) => {
      this.removeMarker();
      this.geocodingService
        .getAddress(e.latlng.lat, e.latlng.lng)
        .subscribe((result: ReverseResult) => {
          this.setupMarker(e.latlng.lat, e.latlng.lng, result.display_name);
          this.metadata = result;
        });
    });

    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          const term = this.searchInput.nativeElement.value;
          this.loading = true;
          this.searchResults = [];

          this.geocodingService.searchAddress(term).subscribe((results) => {
            this.searchResults = results;
            this.loading = false;
          });
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.geocoding?.unsubscribe();
  }

  selectAddress() {
    if (this.foundAddress) {
      let zoom = 15;
      switch (this.foundAddress.class) {
        case ClassEnum.Boundary:
          zoom = 6;
          break;
        default:
          zoom = 17;
      }
      this.map.setView([+this.foundAddress.lat, +this.foundAddress.lon], zoom);
      this.geocodingService
        .getAddress(this.foundAddress.lat, this.foundAddress.lon)
        .subscribe((result: ReverseResult) => {
          this.setupMarker(+result.lat, +result.lon, result.display_name);
          this.metadata = result;
          this.searchTerm = '';
        });
    }
  }

  onSearchInputChange() {
    this.foundAddress = this.searchResults.find(
      (x) => x.display_name === this.searchTerm
    );
  }

  getGeolocation() {
    this.loading = true;

    this.geo.getCurrentPosition(({ coords }) => {
      this.map.setView([coords.latitude, coords.longitude], 17);

      this.geocodingService
        .getAddress(coords.latitude, coords.longitude)
        .subscribe((result: ReverseResult) => {
          this.setupMarker(
            coords.latitude,
            coords.longitude,
            result.display_name
          );
          this.metadata = result;
          this.loading = false;
        });
    });
  }

  private setupMarker(
    lat: number,
    lon: number,
    title: string = 'My manual location'
  ) {
    this.removeMarker();
    if (this.map) {
      this.myMarker = marker([lat, lon], {
        draggable: true,
      })
        .addTo(this.map)
        .bindPopup(title)
        .openPopup();

      this.myMarker.on('dragend', (e: any) => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const marker = e.target;
        const position = marker.getLatLng();

        this.geocodingService
          .getAddress(position.lat, position.lng)
          .pipe(debounceTime(500))
          .subscribe((result) => {
            marker
              .setLatLng(new LatLng(position.lat, position.lng), {
                draggable: true,
              })
              .bindPopup(result.display_name)
              .openPopup();

            this.metadata = result;
            this.map.panTo(new LatLng(position.lat, position.lng));
          });
      });

      this.myMarker.on('contextmenu', (e: any) => {
        this.removeMarker();
      });
    }
  }

  private removeMarker() {
    this.myMarker?.remove();
    this.metadata = undefined;
  }
}
