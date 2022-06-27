import React from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import moment from 'moment';
import 'moment/locale/uk';

import useStyles from './styles';
import { AppContext, AppContextProps } from '../../../Unknown/AppContext';
import rentApi from '../../../../common/api/rentApi';
import { UIContext } from '../../../Unknown/UIContext';
import uploadImg from '../CreateRent/ImgBlock/upload.png';

interface FlatCardProps {
  name?: string;
}

const RentDetail: React.FC<FlatCardProps> = () => {
  const classes = useStyles();
  const { setAlert } = React.useContext(UIContext);
  const {
    handleAdd,
    handleDetails,
    activePlaceId,
    activePlace,
    handleActivePlace,
  } = React.useContext(AppContext) as AppContextProps;

  const handleCancel = () => {
    handleAdd(false);
    handleDetails(false);
  };

  React.useEffect(() => {
    console.log('🧲');
    if (activePlaceId) {
      (async () => {
        try {
          await rentApi
            .getById(activePlaceId)
            .then((resp) => handleActivePlace(resp));
        } catch (err) {
          setAlert({
            show: true,
            severity: 'error',
            message: `${
              err instanceof Error ? err.message : 'Помилка при запиті даних'
            }`,
          });
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePlaceId, setAlert]);

  return (
    <>
      {activePlace && (
        <Grid
          container
          direction="column"
          className={classes.root}
          p="10px 5px"
          spacing={2}
        >
          <Grid item height="200px">
            <Paper
              className={classes.paper}
              component="img"
              src={
                activePlace.urlImage
                  ? `http://localhost:8888/apartments/pictures/${activePlace.urlImage}`
                  : uploadImg
              }
            />
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h3" component="h2">
              {activePlace.title}
            </Typography>
          </Grid>
          <Grid item>
            <Box component="div" className={classes.price}>
              <b>Ціна:</b> {activePlace.price} грн за добу
            </Box>
          </Grid>
          <Grid item>
            <Box component="div" className={classes.date}>
              {moment(activePlace.createdAt).format('D MMMM YYYY, h:mm:ss')}
            </Box>
          </Grid>
          {activePlace.description && (
            <Grid item width="100%">
              <Typography
                className={classes.description}
                variant="h5"
                component="div"
                color="text.secondary"
              >
                {activePlace.description}
              </Typography>
            </Grid>
          )}
          <Grid item display="flex" className={classes.btnBlock}>
            <Button
              onClick={handleCancel}
              variant="contained"
              color="secondary"
            >
              назад
            </Button>
            <Button variant="contained" color="secondary">
              написати
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default React.memo(RentDetail);
