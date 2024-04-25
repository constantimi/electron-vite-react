import React from 'react';
import Content from '../../shared/layout/content/Content';
import Layout from '../../shared/layout/layout/Layout';

type Props = {
  children: React.ReactElement;
};

const LoginLayout = ({ children }: Props) => (
  <Layout>
    <Content className="h-full">{children}</Content>
  </Layout>
);

export default LoginLayout;
