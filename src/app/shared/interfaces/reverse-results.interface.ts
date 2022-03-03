/* eslint-disable @typescript-eslint/naming-convention */
import { Address } from './address.interface';
import { OsmType } from './osm-type.interface';

export interface ReverseResult {
  place_id: number;
  licence: string;
  osm_type: OsmType;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: Address;
  boundingbox: string[];
}
