import { Layout } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { FunctionComponent, memo, PropsWithChildren } from 'react';

import { LoggedInUser } from '../logged-in-user';
import { Title } from '../title';
import './styles.scss';

const AppLayoutBase: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <Layout>
    <Header>
      <div>
        <Title isSiteTitle text="The movie DB" />
        <LoggedInUser />
      </div>
    </Header>
    {children}
  </Layout>
);

export const AppLayout = memo(AppLayoutBase);
