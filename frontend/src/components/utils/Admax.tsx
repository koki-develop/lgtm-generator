import React, { useEffect } from 'react';

export type AdmaxAd = {
  admax_id: string;
  type: string;
};

export type AdmaxProps = React.HTMLProps<HTMLDivElement> & {
  admaxId: string;
};

const Admax: React.FC<AdmaxProps> = React.memo(props => {
  const { admaxId, ...divProps } = props;

  useEffect(() => {
    if (!window['admaxads']) {
      window['admaxads'] = [];
    }
    const ads: AdmaxAd[] = window['admaxads'];
    if (!ads.some(ad => ad.admax_id === admaxId)) {
      ads.push({ admax_id: admaxId, type: 'switch' });
    }

    const tag = document.createElement('script');
    tag.src = 'https://adm.shinobi.jp/st/t.js';
    tag.async = true;
    document.body.appendChild(tag);

    return () => {
      document.body.removeChild(tag);
      ads.splice(
        ads.findIndex(ad => ad.admax_id === admaxId),
        1,
      );
      window['__admax_tag__'] = undefined;
    };
  }, [admaxId]);

  return (
    <div
      {...divProps}
      className='admax-switch'
      data-admax-id={admaxId}
      style={{
        display: 'inline-block',
        ...divProps.style,
      }}
    />
  );
});

Admax.displayName = 'Admax';

export default Admax;
