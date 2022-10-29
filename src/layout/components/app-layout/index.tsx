import { Layout } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { FunctionComponent, memo, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import { LoggedInUser } from '../logged-in-user';
import { Title } from '../title';
import './styles.scss';

const AppLayoutBase: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <Layout>
    <Header>
      <div>
        <Link to="/home" className="no-underline">
          <Title isSiteTitle text="The movie DB" />
        </Link>
        <LoggedInUser />
      </div>
    </Header>
    {children}
  </Layout>
);

export const AppLayout = memo(AppLayoutBase);
