import React from 'react';
import { Image } from '~/types/image';
import { Grid } from '@material-ui/core';
import ImageCard from './ImageCard';

type ImageCardListProps = {
  images: Image[];
  onClickImage: (image: Image) => void;
};

const ImageCardList: React.VFC<ImageCardListProps> = React.memo(
  (props: ImageCardListProps) => {
    return (
      <Grid container spacing={2}>
        {props.images.map(image => (
          <Grid key={image.url} item xs={6} sm={4} md={3}>
            <ImageCard
              key={image.url}
              image={image}
              onClick={() => props.onClickImage(image)}
            />
          </Grid>
        ))}
      </Grid>
    );
  },
);

ImageCardList.displayName = 'ImageCardList';

export default ImageCardList;
