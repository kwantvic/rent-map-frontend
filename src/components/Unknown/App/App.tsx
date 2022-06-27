import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';

import theme from '../../../common/theme';
import { UIContextProvider } from '../UIContext';
import AppContextProvider from '../AppContext';
import Root from '../Root';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router basename={process.env.PUBLIC_URL || '/'}>
        <CssBaseline />
        <UIContextProvider>
          <AppContextProvider>
            <Root />
          </AppContextProvider>
        </UIContextProvider>
      </Router>
    </ThemeProvider>
  );
};

export default React.memo(App);
