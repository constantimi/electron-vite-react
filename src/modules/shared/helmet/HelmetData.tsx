import React from 'react';
import { Helmet } from 'react-helmet-async';
import config from '../config/config';

const HelmetData = () => (
  <Helmet>
    <title>{config.app.name}</title>
    <link
      rel="icon"
      type="image/x-icon"
      media="(prefers-color-scheme: light)"
      href={config.app.icon.light}
    />

    <link
      rel="icon"
      type="image/x-icon"
      media="(prefers-color-scheme: dark)"
      href={config.app.icon.dark}
    />
  </Helmet>
);

export default HelmetData;
