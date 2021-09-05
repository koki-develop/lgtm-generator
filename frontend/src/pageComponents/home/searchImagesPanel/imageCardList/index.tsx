import React from 'react';
import { Image } from '~/types/image';
import { Grid } from '@material-ui/core';
import ImageCard from './imageCard';

type ImageCardListProps = {
  images: Image[];
};

const ImageCardList: React.VFC<ImageCardListProps> = (props: ImageCardListProps) => {
  return (
    <Grid
      container
      spacing={2}
    >
      {props.images.map(image => (
        <Grid
          key={image.url}
          item
          xs={6}
          sm={4}
          md={3}
        >
          <ImageCard
            key={image.url}
            image={image}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageCardList;
