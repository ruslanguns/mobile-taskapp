/* eslint-disable @typescript-eslint/naming-convention */
import { Address } from './address.interface';
import { OsmType } from './osm-type.interface';

export interface SearchResult {
  place_id: number;
  licence: string;
  osm_type: OsmType;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: ClassEnum;
  type: string;
  importance: number;
  icon?: string;
  address: Address;
}

export enum ClassEnum {
  Aeroway = 'aeroway',
  Amenity = 'amenity',
  Boundary = 'boundary',
  Building = 'building',
  Highway = 'highway',
  Landuse = 'landuse',
  ManMade = 'man_made',
  Natural = 'natural',
  Place = 'place',
  Railway = 'railway',
  Shop = 'shop',
  Waterway = 'waterway',
}
