import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import useStyles from './styles';
import image from '../CreateRent/ImgBlock/upload.png';
import { ApartmentItem } from '../../../../common/api/types';
import { AppContext, AppContextProps } from '../../../Unknown/AppContext';

interface FlatCardProps {
  props: ApartmentItem;
}

const RentCard: React.FC<FlatCardProps> = ({ props }) => {
  const classes = useStyles();
  const { handleDetails, handleActivePlaceId, handleAdd } = React.useContext(
    AppContext,
  ) as AppContextProps;

  const handleClick = () => {
    handleActivePlaceId(props.id);
    handleDetails(true);
    handleAdd(false);
  };

  return (
    <CardActionArea onClick={handleClick}>
      <Box pb={1}>
        <Card variant="outlined" className={classes.root}>
          <div style={{ position: 'relative', width: '100%', height: '70%' }}>
            <CardMedia
              component="img"
              className={classes.media}
              src={
                props.urlImage
                  ? `${process.env.REACT_APP_BASE_API_URL}/apartments/pictures/${props.urlImage}`
                  : image
              }
            />
            <div
              style={{
                position: 'absolute',
                color: 'white',
                top: 'auto',
                transform: 'translateY(-100%)',
                backgroundColor: '#40484b',
                padding: '0 5px',
                borderTopRightRadius: 10,
              }}
            >
              {props.price}грн / доба
            </div>
          </div>
          <CardContent className={classes.content}>
            <Box>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography
                    gutterBottom
                    variant="h3"
                    component="h2"
                    className={classes.title}
                  >
                    {props.title}
                  </Typography>
                </Grid>
                {props.description && (
                  <Grid item width="100%">
                    <Typography
                      variant="h6"
                      component="div"
                      className={classes.description}
                      color="text.secondary"
                    >
                      {props.description}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </CardActionArea>
  );
};

export default React.memo(RentCard);
