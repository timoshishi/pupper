import { NavLink } from 'react-router-dom';
import React from 'react';

const MainNav = () => (
  <div>
    <NavLink to='/' exact activeClassName='router-link-exact-active'>
      Home
    </NavLink>
    <NavLink to='/profile' exact activeClassName='router-link-exact-active'>
      Profile
    </NavLink>
  </div>
);

export default MainNav;
