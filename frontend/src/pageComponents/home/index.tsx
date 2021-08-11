import React, { useEffect, useState } from 'react';
import { Lgtm } from '../../types/lgtm';
import { ApiClient } from '../../lib/apiClient';
import LgtmCard from '../../components/lgtmCard';

const Home: React.VFC = () => {
  const [lgtms, setLgtms] = useState<Lgtm[]>([]);

  useEffect(() => {
    ApiClient.getLgtms().then(lgtms => setLgtms(lgtms));
  }, []);

  return (
    <div>
      {lgtms.map(lgtm => (
        <LgtmCard
          key={lgtm.id}
          lgtm={lgtm}
        />
      ))}
    </div>
  );
};

export default Home;
