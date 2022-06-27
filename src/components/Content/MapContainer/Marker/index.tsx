import React from 'react';

import styles from './Marker.module.scss';
import { AppContext, AppContextProps } from '../../../Unknown/AppContext';

interface MarkerProps {
  title: number | string;
  // eslint-disable-next-line react/no-unused-prop-types
  lat: number;
  // eslint-disable-next-line react/no-unused-prop-types
  lng: number;
  id: string | null;
}

const Marker: React.FC<MarkerProps> = ({ title, id }) => {
  const { handleDetails, handleActivePlaceId, handleAdd } = React.useContext(
    AppContext,
  ) as AppContextProps;

  const handleClick = () => {
    if (id) {
      handleActivePlaceId(id);
      handleDetails(true);
      handleAdd(false);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={styles.wrapper}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <span className={styles.text}>{title}</span>
    </div>
  );
};

export default React.memo(Marker);
