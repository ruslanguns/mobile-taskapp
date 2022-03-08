/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storageService: Storage) {
    this.init();
  }

  async init() {
    return await this.storageService.create();
  }

  async get<T = any>(key: string): Promise<T> {
    return await this.storageService.get(key);
  }

  set(key: string, value: any) {
    this.storageService.set(key, value);
  }

  remove(key: string) {
    this.storageService.remove(key);
  }
}
