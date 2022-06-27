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
  paper: {
    border: '1px',
    width: '100%',
    height: '100%',
    borderRadius: '1px',
    borderColor: 'grey.500',
    objectFit: 'cover',
  },
  price: {
    width: 'fit-content',
    fontSize: 16,
    backgroundColor: 'gray',
    color: 'white',
    padding: '0 5px',
    borderRadius: 5,
  },
  date: {
    width: 'fit-content',
    fontSize: 11,
    backgroundColor: 'goldenrod',
    color: 'white',
    padding: '0 5px',
    borderRadius: 5,
  },
  description: {
    overflowWrap: 'break-word',
  },
  btnBlock: {
    justifyContent: 'space-between',
  },
}));
export default useStyles;
