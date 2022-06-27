import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: '1px',
    width: '100%',
    borderRadius: '1px',
    borderColor: 'grey.500',
  },
  img: {
    objectFit: 'cover',
  },
}));
export default useStyles;
