import {
  ActualData,
  ActualResp,
  ApartmentItem,
  CoordData,
  CreateData,
} from './types';
import instance from './index';
import { CoordLatLng } from '../../components/Unknown/AppContext/types';

const rentApi = {
  getCoord(data: CoordData) {
    return instance
      .get<CoordLatLng[]>('/apartments/coord', {
        params: data,
      })
      .then((resp) => resp.data);
  },
  getActual(data: ActualData) {
    return instance
      .get<ActualResp>(`/apartments/actual`, {
        params: data,
      })
      .then((resp) => resp.data);
  },
  getById(id: string) {
    return instance
      .get<ApartmentItem>(`/apartments/${id}`)
      .then((resp) => resp.data);
  },
  create(data: CreateData) {
    return instance
      .post<ApartmentItem>('/apartments/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((resp) => resp.data);
  },
};

export default rentApi;
