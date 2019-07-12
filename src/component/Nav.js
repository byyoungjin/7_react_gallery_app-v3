import React from 'react';
import {NavLink} from 'react-router-dom';


//Nav for 3 buttons
const Nav = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to='/cats'>Cats</NavLink></li>
        <li><NavLink to='/dogs'>Dogs</NavLink></li>
        <li><NavLink to='/computers'>Computers</NavLink></li>
      </ul>
    </nav>


  )
}

export default Nav;
