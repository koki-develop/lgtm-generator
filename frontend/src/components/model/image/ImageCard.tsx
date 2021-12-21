import React from 'react';
import { Image } from '~/types/image';
import { Box, Card, CardActionArea, CardContent } from '@mui/material';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { grey } from '@mui/material/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContent: {
      padding: theme.spacing(1),
      paddingBottom: `${theme.spacing(1)} !important`,
    },
    img: {
      border: '1px solid',
      borderColor: grey['A100'],
      maxHeight: 140,
      maxWidth: '100%',
    },
    imgContainer: {
      alignItems: 'center',
      display: 'flex',
      height: 150,
      justifyContent: 'center',
    },
  }),
);

type ImageCardProps = {
  image: Image;
  onClick: () => void;
};

const ImageCard: React.VFC<ImageCardProps> = (props: ImageCardProps) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea onClick={props.onClick}>
        <CardContent className={classes.cardContent}>
          <Box className={classes.imgContainer}>
            <img
              className={classes.img}
              src={props.image.url}
              alt={props.image.title}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ImageCard;
