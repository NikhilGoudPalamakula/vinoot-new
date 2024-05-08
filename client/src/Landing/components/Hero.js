import React from 'react';
import './Hero.css'
// import hero data
import { heroData } from '../data';

// import components
import Header from './Header';
import Vnavbar from './Vnavbar';
import Banner from '../Banner';

const Hero = () => {
  // destructure hero
  const { title, subtitle, btnText, image } = heroData;
  return (
   <>
   {/* <Vnavbar /> */}
    {/* <section className='lg:h-[650px] mt-16'>
      
      <Banner/>
    </section> */}
    <section className='lg:h-[650px] py-16'>
      <Vnavbar />
      <div className='hero-total-1'>
        <div className='hero-1div' >
          <h1 className='he-h1'>Connected to Nature, Exploring Ayurvedic Wellbeing</h1>
        </div>
        <div className='hero-2div' >
          <img className='her-image' src={image} alt='' />
        </div>
      </div>
    </section>
   </>
  );
};
export default Hero;