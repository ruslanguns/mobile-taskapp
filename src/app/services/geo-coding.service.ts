import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReverseResult, SearchResult } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  constructor(private httpClient: HttpClient) {}

  searchAddress(q: string) {
    const apiUrl = 'https://nominatim.openstreetmap.org/search';

    return this.httpClient.get<SearchResult[]>(apiUrl, {
      params: {
        format: 'json',
        q,
        limit: 5,
        addressdetails: 1,
      },
    });
  }

  getAddress(
    lat: number | string = 0,
    lon: number | string = 0
  ): Observable<ReverseResult> {
    const apiUrl = 'https://nominatim.openstreetmap.org/reverse';

    return this.httpClient.get<ReverseResult>(apiUrl, {
      params: {
        format: 'json',
        lat,
        lon,
        zoom: 18,
        addressdetails: 1,
      },
    });
  }
}
