export interface CoordLatLng {
  lat: number;
  lng: number;
  id: string;
}

export interface NewLatLng {
  lat: number;
  lng: number;
}

export interface ActualBounds {
  maxLat: number;
  minLat: number;
  maxLng: number;
  minLng: number;
}
