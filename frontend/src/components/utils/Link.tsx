import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import NextLink from 'next/link';
import React from 'react';

type LinkProps = MuiLinkProps & {
  external?: boolean;
};

const Link: React.VFC<LinkProps> = React.memo(props => {
  const { external, ...linkProps } = props;

  if (external) {
    return <MuiLink target='_blank' rel='noreferrer noopener' {...linkProps} />;
  }

  const { href, ...otherLinkProps } = linkProps;

  return (
    <NextLink href={href} passHref>
      <MuiLink {...otherLinkProps} />
    </NextLink>
  );
});

Link.displayName = 'Link';

export default Link;
