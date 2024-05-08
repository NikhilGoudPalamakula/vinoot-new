import React from 'react';

// import navigation data
import { navigationData } from '../data';
import { Link } from 'react-router-dom';
const Nav = () => {
  return (
    <nav>
      <ul className='flex gap-x-8'>
        {navigationData.map((item, index) => {
          return (
            <li  key={index}>
              {/* <a href={item.href}>{item.name}</a> */}
              <Link className='nav-links' href={item.href} >{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
