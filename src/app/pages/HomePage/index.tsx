import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { PageWrapper } from 'app/components/PageWrapper';
import Content from './Content';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Reservations" />
      </Helmet>
      <NavBar />
      <PageWrapper>
        <Content />
      </PageWrapper>
    </>
  );
}
