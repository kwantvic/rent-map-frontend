import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from '../../../common/theme';
import { UIContextProvider } from '../UIContext';
import AppContextProvider from '../AppContext';
import Root from '../Root';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UIContextProvider>
        <AppContextProvider>
          <Root />
        </AppContextProvider>
      </UIContextProvider>
    </ThemeProvider>
  );
};

export default React.memo(App);
