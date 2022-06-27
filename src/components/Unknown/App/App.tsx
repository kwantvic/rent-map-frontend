import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from './common/theme';
import Root from './components/Unknown/Root';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Root />
    </ThemeProvider>
  );
};

export default App;
