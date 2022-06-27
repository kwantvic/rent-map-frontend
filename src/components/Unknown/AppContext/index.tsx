import React from 'react';

import { ActualBounds, CoordLatLng, NewLatLng } from './types';
import rentApi from '../../../common/api/rentApi';
import { UIContext } from '../UIContext';
import { ApartmentItem } from '../../../common/api/types';
import { pageSize } from '../../../common/constants';

export const AppContext = React.createContext<AppContextProps>(
  {} as AppContextProps,
);

export interface AppContextProps {
  isAdd: boolean;
  handleAdd: (bool: boolean) => void;
  isDetails: boolean;
  handleDetails: (bool: boolean) => void;
  isLoading: boolean;
  places: CoordLatLng[];
  handlePlaces: (arr: CoordLatLng[]) => void;
  newPlace: NewLatLng | null;
  handleNewPlace: (coordLatLng: NewLatLng | null) => void;
  handleBounds: (bounds: ActualBounds) => void;
  activePlaceId: string;
  handleActivePlaceId: (id: string) => void;
  activePlace: ApartmentItem | null;
  handleActivePlace: (place: ApartmentItem) => void;
  items: ApartmentItem[];
  handleItems: (itemsApart: ApartmentItem[]) => void;
  total: number;
  handleTotal: (x: number) => void;
  currentPage: number;
  handleCurrentPage: (x: number) => void;
  hasMoreItems: boolean;
  handleHasMoreItems: (bool: boolean) => void;
}

const AppContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { setAlert } = React.useContext(UIContext);

  const [isAdd, setIsAdd] = React.useState(false);
  const [isDetails, setIsDetails] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [places, setPlaces] = React.useState<CoordLatLng[]>([]);
  const [newPlace, setNewPlace] = React.useState<NewLatLng | null>(null);
  const [bounds, setBounds] = React.useState<ActualBounds | null>(null);
  const [activePlaceId, setActivePlaceId] = React.useState('');
  const [activePlace, setActivePlace] = React.useState<ApartmentItem | null>(
    null,
  );
  const [currentPage, setCurrentPage] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [items, setItems] = React.useState<ApartmentItem[]>([]);
  const [hasMoreItems, setHasMoreItems] = React.useState(true);

  React.useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      (async () => {
        try {
          await rentApi
            .getCoord(bounds)
            .then((resp) => setPlaces(resp))
            .then(() => setIsLoading(false));
        } catch (err) {
          setAlert({
            show: true,
            severity: 'error',
            message: `${
              err instanceof Error ? err.message : 'Помилка при запиті даних'
            }`,
          });
        }
      })();
    }
  }, [bounds, setAlert]);

  React.useEffect(() => {
    if (bounds) {
      const actualData = {
        minLat: bounds.minLat,
        maxLat: bounds.maxLat,
        minLng: bounds.minLng,
        maxLng: bounds.maxLng,
        pageSize,
        pageNumber: currentPage,
      };
      (async () => {
        try {
          await rentApi.getActual(actualData).then((resp) => {
            setItems((prev) => [...prev, ...resp.items] as ApartmentItem[]);
            setTotal(resp.total);
          });
        } catch (err) {
          setAlert({
            show: true,
            severity: 'error',
            message: `${
              err instanceof Error ? err.message : 'Помилка при запиті даних'
            }`,
          });
        }
      })();
    }
  }, [bounds, currentPage, setAlert]);

  return (
    <AppContext.Provider
      value={React.useMemo(
        () => ({
          isAdd,
          handleAdd: (bool) => setIsAdd(bool),
          isDetails,
          handleDetails: (bool) => setIsDetails(bool),
          isLoading,
          places,
          handlePlaces: (arr) => setPlaces(arr),
          newPlace,
          handleNewPlace: (newLatLng) => setNewPlace(newLatLng),
          handleBounds: (actualBounds) => setBounds(actualBounds),
          activePlaceId,
          handleActivePlaceId: (id) => setActivePlaceId(id),
          activePlace,
          handleActivePlace: (place) => setActivePlace(place),
          items,
          handleItems: (itemsApart) => setItems(itemsApart),
          total,
          handleTotal: (x) => setTotal(x),
          currentPage,
          handleCurrentPage: (x) => setCurrentPage(x),
          hasMoreItems,
          handleHasMoreItems: (bool) => setHasMoreItems(bool),
        }),
        [
          activePlace,
          activePlaceId,
          currentPage,
          hasMoreItems,
          isAdd,
          isDetails,
          isLoading,
          items,
          newPlace,
          places,
          total,
        ],
      )}
    >
      {children}
    </AppContext.Provider>
  );
};

export default React.memo(AppContextProvider);
