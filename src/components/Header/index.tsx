import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

import { AppContext, AppContextProps } from '../Unknown/AppContext';
import useStyles from './styles';

const Header: React.FC = () => {
  const classes = useStyles();

  const { isAdd, handleAdd, handleDetails } = React.useContext(
    AppContext,
  ) as AppContextProps;

  const clickToAdd = () => {
    handleAdd(true);
    handleDetails(false);
  };

  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <Typography variant="h2" component="span" flexGrow={1}>
          RENT-MAP
        </Typography>
        <Box>
          <Button
            onClick={clickToAdd}
            disabled={isAdd}
            variant="contained"
            color="secondary"
          >
            Здати в оренду +
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(Header);
