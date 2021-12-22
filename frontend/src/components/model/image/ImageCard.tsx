import React from 'react';
import { Box, Card, CardActionArea, CardContent } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Image } from '~/types/image';

type ImageCardProps = {
  image: Image;
  onClick: () => void;
};

const ImageCard: React.VFC<ImageCardProps> = (props: ImageCardProps) => {
  return (
    <Card>
      <CardActionArea onClick={props.onClick}>
        <CardContent sx={{ p: 1 }}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              height: 150,
              justifyContent: 'center',
            }}
          >
            <img
              src={props.image.url}
              alt={props.image.title}
              style={{
                border: '1px solid',
                borderColor: grey['A100'],
                maxHeight: 140,
                maxWidth: '100%',
              }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ImageCard;
