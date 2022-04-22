import React, { FC } from 'react';

const Home: FC = () => (
  <div>
    Home Page
    <br />
    {`SITE_DOMAIN: ${process.env.REACT_APP_SITE_DOMAIN}`}
  </div>
);

export default Home;
