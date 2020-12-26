import React from 'react';

import MainNav from './MainNav';
import AuthNav from '../AuthButtons/AuthenticationButton';

const NavBar = () => {
  return (
    <div>
      <nav>
        <div>
          <div />
          <MainNav />
          <AuthNav />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
