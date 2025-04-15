export interface SelectItem {
  label: string;
  value: string;
}

export interface SearchByPlaceResponse {
  suggestions: Suggestion[];
  attribution: string;
  response_id: string;
}

export interface Suggestion {
  name: string;
  mapbox_id: string;
  feature_type: string;
  place_formatted: string;
  context: Context;
  language: string;
  maki: string;
  metadata: unknown;
  address?: string;
  full_address?: string;
  poi_category?: string[];
  poi_category_ids?: string[];
  external_ids?: unknown[];
  distance?: number;
}

export interface Context {
  country: Country;
  region?: Region;
  postcode?: Postcode;
  place?: Place;
  address?: Address;
  street?: Street;
}

export interface Country {
  id?: string;
  name: string;
  country_code: string;
  country_code_alpha_3: string;
}

export interface Region {
  id: string;
  name: string;
  region_code: string;
  region_code_full: string;
}

export interface Postcode {
  id: string;
  name: string;
}

export interface Place {
  id: string;
  name: string;
}

export interface Address {
  name: string;
  address_number: string;
  street_name: string;
}

export interface Street {
  name: string;
}

export interface SearchByIdResponse {
  type: string;
  features: Feature[];
  attribution: string;
}

interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

interface Geometry {
  coordinates: number[];
  type: string;
}

interface Properties {
  name: string;
  mapbox_id: string;
  feature_type: string;
  address: string;
  full_address: string;
  place_formatted: string;
  context: Context;
  coordinates: Coordinates;
  language: string;
  maki: string;
  poi_category: string[];
  poi_category_ids: string[];
  external_ids: Record<string, unknown>;
  metadata: Record<string, unknown>;
  operational_status: string;
}

interface Coordinates {
  latitude: number;
  longitude: number;
  routable_points: RoutablePoint[];
}

interface RoutablePoint {
  name: string;
  latitude: number;
  longitude: number;
}
