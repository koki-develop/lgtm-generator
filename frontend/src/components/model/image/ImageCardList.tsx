import React from 'react';
import { Image } from '~/types/image';
import { Grid } from '@mui/material';
import ImageCard from './ImageCard';

type ImageCardListProps = {
  images: Image[];
  onClickImage: (image: Image) => void;
};

const ImageCardList: React.VFC<ImageCardListProps> = React.memo(props => {
  const { images, onClickImage } = props;

  return (
    <Grid container spacing={2}>
      {images.map(image => (
        <Grid key={image.url} item xs={6} sm={4} md={3}>
          <ImageCard
            key={image.url}
            image={image}
            onClick={() => onClickImage(image)}
          />
        </Grid>
      ))}
    </Grid>
  );
});

ImageCardList.displayName = 'ImageCardList';

export default ImageCardList;
