import React from 'react';
import Navbar from './Navbar';
import Title from './Title';

const MainPageLayout = ({ children }) => {
  return (
    <div>
      <Title
        title="Show Finder"
        subtitle="Are you looking for a show or an actor?"
      />
      <Navbar />
      {children}
    </div>
  );
};

export default MainPageLayout;
