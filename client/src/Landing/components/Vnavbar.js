import React, { useState, useEffect } from 'react';
import './Vnavbar.css'
import { Link } from 'react-router-dom';

const Vnavbar = () => {

  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);


  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', transition: 'top 0.3s', zIndex: 1000, ...(visible ? {} : { top: '-100px' }) }}>
        <div className='nav'>
  <nav class="container13">
    <input id="nav-toggle" type="checkbox" />
    <div class="logo"> <Link  to='/'><img src='https://vinootherbal.com/wp-content/uploads/2024/02/grrb-1.png' className='logo-543s' style={{width:'9rem',height:'5rem'}}/></Link></div>
    <ul class="links">
      <li class="list">
      <Link to='/'> <button className='nav-btt'>Home</button></Link> 
        <div class="home_underline"></div>
      </li>
      <li class="list">
      <Link  to='/Buyhome' >  <button className='nav-btt'>E-Commerce</button></Link>
        <div class="home_underline"></div>
      </li>
      {/* <li class="list">
      <Link  to='/Buyproducts' >  <button className='nav-btt'>Products</button></Link>
        <div class="home_underline"></div>
      </li> */}
      <li class="list">
      <Link  to='/Franchise' >  <button className='nav-btt'>Franchise</button></Link>
        <div class="home_underline"></div>
      </li>
      <li class="list">
      <Link to='/Services'>  <button className='nav-btt'>Services</button></Link>
        <div class="home_underline"></div>
      </li>
      <li class="list">
      <Link to='/AboutUsPage'> <button className='nav-btt'>About</button></Link> 
        <div class="home_underline"></div>
      </li>
      <li class="list">
      <Link to='/Whyus'> <button className='nav-btt'>Why Us</button></Link>
        <div class="home_underline"></div>
      </li>
      <li class="list">
      <Link to='/Whatweoffer'> <button className='nav-btt'>What we offer</button></Link>
        <div class="home_underline"></div>
      </li>
      <Link to="/LoginForm"><button className='btn543s'>Login</button></Link>

    </ul>
    <label for="nav-toggle" class="icon-burger">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </label>
  </nav>
  {/* <div class="header">
    <img src="https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
    <img src="https://images.unsplash.com/photo-1652021174975-81ddc1d8dd46?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80" alt="" />
    <img src="https://images.unsplash.com/photo-1651972824059-96e321c58ec8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
  </div> */}
</div>
    </div>
  )
}

export default Vnavbar