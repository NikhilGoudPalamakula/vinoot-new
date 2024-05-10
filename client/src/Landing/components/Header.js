import React, { useState } from 'react';

// import components
import Logo from '../assets/img/logo.png';
import Nav from './Nav';
import NavMobile from './NavMobile';

// import icons
import { FaBars } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Header = () => {
  const [navMobile, setNavMobile] = useState(false);
  return (
    <header
      className='mb-5 lg:mb-0 z-20 relative px-4 lg:px-0'
      data-aos='fade-down'
      data-aos-delay='600'
      data-aos-duration='500'
    >
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-[120px]'>
            {/* logo */}
            <a href='#'>
              <img src={Logo} alt='' />
            </a>

            {/* nav / initially hidden / show on large screens  */}
            <div className='hidden lg:flex'>
              <Nav />
            </div>
          </div>

          {/* mobile nav / initially is showing / hide on large screens */}
          <div
            className={`${
              navMobile ? 'max-h-52' : 'max-h-0'
            } lg:hidden absolute top-24 bg-accent-tertiary w-full left-0 right-0 font-bold rounded transition-all overflow-hidden`}
          >
            <NavMobile />
          </div>

         <Link className='login-olink'  to='/Log1' > <button className='login-link'>
            Login
            <BsArrowRight className='login-arrow' />
          </button> </Link>

          {/* nav trigger btn / only shows on mobile screens */}
          {/* <div
            onClick={() => setNavMobile(!navMobile)}
            className='text-2xl text-primary cursor-pointer lg:hidden'
          >
            <FaBars />
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;