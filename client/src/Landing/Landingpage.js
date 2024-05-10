import React from 'react';

// import animate on scroll
import Aos from 'aos';
import 'aos/dist/aos.css';

// import components
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
// import Products from "./components/Products"
import Regrowth from "./components/Regrowth";
import Consultants from './components/Consultants';


const Landingpage = () => {
  // animate on scroll initialization
  Aos.init({
    duration: 1800,
    offset: 0,
  });
  return (
    <div className='overflow-hidden'>
   
      <Hero />
      {/* <About /> */}
      <Regrowth/>
      <Features />
      {/* <Testimonials /> */}
      <CtaSection />
      <Consultants/>
      {/* <Products/> */}
      <Footer />
    </div>
  );
};

export default Landingpage;
