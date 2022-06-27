import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import stylesConstants from '../../../common/constants';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'sticky',
    top: theme.spacing(stylesConstants.SPACING_HEADER_HEIGHT),
    height: `calc(100vh - ${theme.spacing(
      stylesConstants.SPACING_HEADER_HEIGHT,
    )})`,
    width: '100%',
  },
}));
export default useStyles;
