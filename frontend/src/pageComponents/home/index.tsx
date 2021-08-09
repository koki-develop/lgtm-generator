import React, { useEffect, useState } from 'react';
import { Lgtm } from '../../types/lgtm';
import { ApiClient } from '../../lib/apiClient';

const Home: React.VFC = () => {
  const [lgtms, setLgtms] = useState<Lgtm[]>([]);

  useEffect(() => {
    ApiClient.getLgtms().then(lgtms => setLgtms(lgtms));
  }, []);

  return (
    <div>
      {lgtms.map(lgtm => (
        <div key={lgtm.id}>
          <p>{lgtm.id}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
