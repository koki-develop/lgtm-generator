import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import React from 'react';
import urlJoin from 'url-join';
import LgtmCardButtonGroup from '~/components/model/lgtm/LgtmCardButtonGroup';

const StyledImage = styled('img')({});

type LgtmCardProps = {
  id: string;
};

const LgtmCard: React.FC<LgtmCardProps> = React.memo(props => {
  const { id } = props;

  return (
    <Card data-testid='lgtm-card' data-resourceid={id}>
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
            src={urlJoin(process.env.NEXT_PUBLIC_LGTMS_ORIGIN, id)}
            alt='LGTM'
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              maxHeight: 140,
              maxWidth: '100%',
            }}
          />
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', pt: 0 }}>
        <LgtmCardButtonGroup id={id} />
      </CardActions>
    </Card>
  );
});

LgtmCard.displayName = 'LgtmCard';

export default LgtmCard;
