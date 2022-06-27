import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import stylesConstants from '../../common/constants';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: theme.spacing(stylesConstants.SPACING_HEADER_HEIGHT),
  },
}));
export default useStyles;
