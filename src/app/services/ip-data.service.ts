import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DbIP } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class IPDataService {
  constructor(private httpClient: HttpClient) {}

  getDataFromIP(): Observable<DbIP> {
    const apiUrl = 'https://api.db-ip.com/v2/free/self';
    return this.httpClient.get<DbIP>(apiUrl);
  }
}
