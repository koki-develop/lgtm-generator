import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import React, { useCallback } from 'react';
import { Image } from '~/types/image';

const StyledImage = styled('img')({});

type ImageCardProps = {
  image: Image;
  onClick: (image: Image) => void;
};

const ImageCard: React.VFC<ImageCardProps> = React.memo(props => {
  const { image, onClick } = props;

  const handleClick = useCallback(() => {
    onClick(image);
  }, [image, onClick]);

  return (
    <Card>
      <CardActionArea
        data-testid='image-card-action-area'
        onClick={handleClick}
      >
        <CardContent sx={{ p: 1 }}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              height: 150,
              justifyContent: 'center',
            }}
          >
            <StyledImage
              src={image.url}
              alt={image.title}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                maxHeight: 140,
                maxWidth: '100%',
              }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

ImageCard.displayName = 'ImageCard';

export default ImageCard;
