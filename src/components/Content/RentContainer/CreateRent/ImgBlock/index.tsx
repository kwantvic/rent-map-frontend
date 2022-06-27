import React from 'react';
import { Box, Button, Paper } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

import useStyles from './styles';
import uploadImg from './upload.png';

interface ImgBlockProps {
  file?: File;
  handleImgChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImgBlock: React.FC<ImgBlockProps> = React.memo(
  ({ handleImgChange, file }) => {
    const classes = useStyles();
    return (
      <>
        <Paper className={classes.root}>
          <label htmlFor="imgFile">
            <Box
              width="100%"
              height="150px"
              component="img"
              className={classes.img}
              src={file ? URL.createObjectURL(file) : uploadImg}
              alt="Apartment"
            />
            <input
              type="file"
              accept="image/*"
              id="imgFile"
              name="imgFile"
              multiple={false}
              style={{ display: 'none' }}
              onChange={handleImgChange}
            />
            <Button
              component="span"
              variant="text"
              color="secondary"
              startIcon={<PhotoCamera />}
              fullWidth
            >
              Загрузити фото
            </Button>
          </label>
        </Paper>
      </>
    );
  },
);

export default React.memo(ImgBlock);
