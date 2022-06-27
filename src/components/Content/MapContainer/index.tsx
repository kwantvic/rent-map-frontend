import React from 'react';
import { Box } from '@mui/material';
import GoogleMapReact, {
  ChangeEventValue,
  ClickEventValue,
} from 'google-map-react';

import Marker from './Marker';
import { AppContext, AppContextProps } from '../../Unknown/AppContext';
import useStyles from './styles';

const MapContainer: React.FC = () => {
  const {
    isAdd,
    newPlace,
    handleNewPlace,
    places,
    handleBounds,
    handleItems,
    handleTotal,
  } = React.useContext(AppContext) as AppContextProps;

  const classes = useStyles();

  const isMountedRef = React.useRef(false);
  const timerRef = React.useRef<undefined | ReturnType<typeof setTimeout>>(
    undefined,
  );

  const addNewMarker = (e: ClickEventValue) => {
    if (!isAdd) return;
    const { lat, lng } = e;
    handleNewPlace({ lat, lng });
  };

  const debounceBounds = (e: ChangeEventValue) => {
    if (isMountedRef.current) {
      const { bounds } = e;
      clearInterval(timerRef.current);
      timerRef.current = setTimeout(() => {
        handleItems([]);
        handleTotal(0);
        handleBounds({
          minLat: bounds.se.lat,
          maxLat: bounds.nw.lat,
          minLng: bounds.nw.lng,
          maxLng: bounds.se.lng,
        });
      }, 1000);
    }
    isMountedRef.current = true;
  };

  function handleApiLoaded(map: google.maps.Map) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { Ra, ub } = map.getBounds();
    handleBounds({
      minLat: ub.lo,
      maxLat: ub.hi,
      minLng: Ra.lo,
      maxLng: Ra.hi,
    });
  }

  return (
    <Box className={classes.root}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: String(process.env.REACT_APP_GOOGLE_API_KEY),
          language: 'uk',
        }}
        defaultCenter={{ lat: 50.450001, lng: 30.523333 }}
        defaultZoom={13}
        options={{
          zoomControlOptions: { position: 7 },
          fullscreenControl: false,
          disableDoubleClickZoom: true,
        }}
        onClick={addNewMarker}
        onChange={debounceBounds}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => handleApiLoaded(map)}
      >
        {places.map(({ lat, lng, id }, i) => {
          return <Marker key={id} lat={lat} lng={lng} title={i + 1} id={id} />;
        })}
        {newPlace && (
          <Marker title="🟠" lat={newPlace.lat} lng={newPlace.lng} id={null} />
        )}
      </GoogleMapReact>
    </Box>
  );
};

export default React.memo(MapContainer);
