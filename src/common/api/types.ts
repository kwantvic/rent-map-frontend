export interface CreateData {
  lat: number;
  lng: number;
  title: string;
  description?: string;
  price: number;
  urlImage?: string;
}

export interface ActualData {
  maxLat: number;
  minLat: number;
  maxLng: number;
  minLng: number;
  pageNumber: number;
  pageSize: number;
}

export interface CoordData {
  maxLat: number;
  minLat: number;
  maxLng: number;
  minLng: number;
}

export interface ApartmentItem {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description?: string;
  price: number;
  urlImage?: string;
  createdAt: string;
}

export interface ActualResp {
  items: ApartmentItem[];
  total: number;
}
