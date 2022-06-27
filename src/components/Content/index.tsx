import React from 'react';
import { Grid } from '@mui/material';

import MapContainer from './MapContainer';
import RentContainer from './RentContainer';

const Content: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={9}>
        <MapContainer />
      </Grid>
      <Grid item xs={3}>
        <RentContainer />
      </Grid>
    </Grid>
  );
};

export default React.memo(Content);
