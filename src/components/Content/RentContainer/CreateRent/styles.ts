import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import stylesConstants from '../../../../common/constants';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: `calc(100vh - ${theme.spacing(
      stylesConstants.SPACING_HEADER_HEIGHT,
    )})`,
    backgroundColor: '#f1f4f5',
  },
  btnBlock: {
    justifyContent: 'space-between',
  },
  input: {
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      display: 'none',
    },
  },
}));
export default useStyles;
