import React from 'react';
import Header from '../../Header';
import Content from '../../Content';

const Root: React.FC = () => {
  return (
    <>
      <Header />
      <Content />
    </>
  );
};

export default React.memo(Root);
