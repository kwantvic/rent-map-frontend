import React from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import useStyles from './styles';
import ImgBlock from './ImgBlock';
import { CreateValues, FormInput } from '../../MapContainer/types';
import schema from './formValidation';
import { UIContext } from '../../../Unknown/UIContext';
import rentApi from '../../../../common/api/rentApi';
import { AppContext, AppContextProps } from '../../../Unknown/AppContext';

interface CreateRentProps {
  name?: string;
}

const CreateRent: React.FC<CreateRentProps> = () => {
  const classes = useStyles();
  const {
    handleAdd,
    newPlace,
    handleNewPlace,
    handleDetails,
    items,
    handleItems,
    places,
    handlePlaces,
  } = React.useContext(AppContext) as AppContextProps;
  const { setAlert } = React.useContext(UIContext);

  const [imgFileSelected, setImgFileSelected] = React.useState<File>();
  const [values, setValues] = React.useState<CreateValues>({
    title: '',
    price: null,
    description: '',
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInput>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onChangeValues = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileList = e.target.files;
      setImgFileSelected(fileList[0]);
    }
  };

  const handleCancel = () => {
    handleAdd(false);
    handleNewPlace(null);
    handleDetails(false);
  };

  const onSubmit = async (data: FormInput) => {
    if (!newPlace) {
      setAlert({
        show: true,
        severity: 'warning',
        message: 'Укажіть ваше місце на мапі 🟠',
      });
      return;
    }
    const createData = {
      lat: newPlace.lat,
      lng: newPlace.lng,
      title: data.title,
      price: data.price,
      description: data.description,
      file: imgFileSelected,
    };
    try {
      await rentApi.create(createData).then((resp) => {
        handleItems([resp, ...items]);
        handlePlaces([
          { lat: resp.lat, lng: resp.lng, id: resp.id },
          ...places,
        ]);
      });
      handleAdd(false);
      handleDetails(false);
      handleNewPlace(null);
    } catch (err) {
      setAlert({
        show: true,
        severity: 'error',
        message: `${
          err instanceof Error ? err.message : 'Помилка при відправці даних'
        }`,
      });
    }
  };

  return (
    <Grid className={classes.root} alignItems="center" p="10px 5px">
      <Typography variant="h3" textAlign="center">
        Створити оголошення
      </Typography>
      <Grid container direction="column" spacing={4} pt={4}>
        <Grid item>
          <TextField
            {...register('title')}
            value={values.title}
            onChange={onChangeValues}
            label="Вкажіть назву*"
            multiline
            rows={2}
            fullWidth
            color="secondary"
            error={!!errors.title && values.title.length === 0}
          />
        </Grid>
        <Grid item>
          <TextField
            {...register('price')}
            type="number"
            value={values.price ?? ''}
            onChange={onChangeValues}
            InputProps={{ classes: { input: classes.input } }}
            label="Ціна за добу*"
            color="secondary"
            error={!!errors.price && values.price === null}
          />
        </Grid>
        <Grid item>
          <TextField
            {...register('description')}
            value={values.description}
            onChange={onChangeValues}
            label="Опис"
            multiline
            rows={2}
            fullWidth
            color="secondary"
          />
        </Grid>
        <Grid item>
          <ImgBlock handleImgChange={handleImgChange} file={imgFileSelected} />
        </Grid>
        <Grid item display="flex" className={classes.btnBlock}>
          <Button onClick={handleCancel} variant="contained" color="secondary">
            відміна
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="secondary"
          >
            оприлюднити
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(CreateRent);
