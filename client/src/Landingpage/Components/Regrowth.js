import React from 'react';
import "./Regrowth.css";
import Image1 from '../Assets/scalp cleaning.png';
import Image2 from '../Assets/temp.png';
import Image3 from '../Assets/cleaning-spray.png';
import Image4 from '../Assets/hair-spray.png';

const Regrowthpage = () => {
  return (
    <div className='hair-regrowth-container'>
        <div className='hair-regrowth' data-aos='fade-up' data-aos-delay='50'>
            <h1 className='main-content-head' data-aos='fade-up'>How Hair Regrowth Works</h1>
            <div className='bottom-content'>
              <div className='part' data-aos='fade-up' data-aos-delay='50'>
                <div className='image-bg'>
                  <img src={Image1} className='img-icon'  alt='Scalp cleaning'/>
                </div>
                <h2 className='heading'>Scalp cleaning</h2>
                <p className='para-about'>Scalp cleaning with pure herbal powder.</p>
              </div>
              <div className='part' data-aos='fade-up' data-aos-delay='50'>
                <div className='image-bg'>
                  <img src={Image2} className='img-icon' alt='Raising scalp temperature'/>
                </div>
                <h2 className='heading'>Raising scalp temperature</h2>
                <p className='para-about'>Raising scalp temperature up to 1-2 degree centigrade.</p>
              </div>
              <div className='part'  data-aos='fade-up' data-aos-delay='50'>
                <div className='image-bg'>
                  <img src={Image3} className='img-icon' alt='Cleaning follicles'/>
                </div>
                <h2 className='heading'>Cleaning follicles</h2>
                <p className='para-about'>Cleaning follicles with seed paste by adsorption.</p>
              </div>
              <div className='part' data-aos='fade-up' data-aos-delay='100'>
                <div className='image-bg'>
                  <img src={Image4} className='img-icon' alt='Spraying Herbal Solution'/>
                </div>
                <h2 className='heading'>Spraying Herbal Solution</h2>
                <p className='para-about'>Spraying Herbal Solution all over the scalp.</p>
              </div>
            </div>
        </div>
    </div>
  );
}

export default Regrowthpage;
