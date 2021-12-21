import React from 'react';
import Link, { LinkProps } from '@mui/material/Link';

type ExternalLinkProps = LinkProps;

const ExternalLink: React.VFC<ExternalLinkProps> = React.memo(props => {
  return <Link {...props} target='_blank' rel='noopener noreferrer' />;
});

ExternalLink.displayName = 'ExternalLink';

export default ExternalLink;
