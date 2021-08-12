import React from 'react';

type ExternalLinkProps = React.HTMLProps<HTMLAnchorElement>;

const ExternalLink: React.VFC<ExternalLinkProps> = (props: ExternalLinkProps) => {
  return (
    <a
      {...props}
      target='_blank'
      rel='noopener noreferrer'
    >
      {props.children}
    </a>
  );
};

export default ExternalLink;
