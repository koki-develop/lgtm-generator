import React, { useEffect, useState } from 'react';
import { Lgtm } from '../../types/lgtm';
import { ApiClient } from '../../lib/apiClient';
import urlJoin from 'url-join';

const Home: React.VFC = () => {
  const [lgtms, setLgtms] = useState<Lgtm[]>([]);

  useEffect(() => {
    ApiClient.getLgtms().then(lgtms => setLgtms(lgtms));
  }, []);

  return (
    <div>
      {lgtms.map(lgtm => (
        <div key={lgtm.id}>
          <img
            src={`${urlJoin(process.env.NEXT_PUBLIC_LGTMS_ORIGIN, lgtm.id)}`}
            style={{ width: 300 }}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;
