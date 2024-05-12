import React from 'react'
import "./Regrowth.css"
import Image1 from '../assets/img/scalp cleaning.png';
import Image2 from '../assets/img/temp.png';
import Image3 from '../assets/img/cleaning-spray.png';
import Image4 from '../assets/img/hair-spray.png';

const Regrowth = () => {
  return (
    <div className='hair-regrowth-conatiner'>
        <div className='hair-regrowth1s' data-aos='fade-up' data-aos-delay='50'>
            <h1 className='main-content-head1s'  data-aos='fade-up'>How Hair Regrowth Works</h1>
            <br></br>
            <br></br>
            <br></br>
            <div className='bottom-content1s'>
            <div className='part1s' data-aos='fade-up' data-aos-delay='50'>
            <div className='image-bg1s'>
                <img src={Image1} alt="image" className='img-icon1s'/>
            </div>
            <h2 className='heading-h2s'>Scalp cleaning</h2>
            <p className='para-about1s'>Scalp cleaning with pure herbal powder.</p>
            </div>
            <div className='part1s' data-aos='fade-up' data-aos-delay='50'>
            <div className='image-bg1s'>
            <img src={Image2} alt="image" className='img-icon1s'/>
            </div>
            <h2 className='heading-h2s'>Raising scalp temperature</h2>
            <p className='para-about1s'>Raising scalp temperature up to 1-2 degree centigrade.</p>
            </div>
            <div className='part1s'  data-aos='fade-up' data-aos-delay='50'>
            <div className='image-bg1s'>
            <img src={Image3} alt="image" className='img-icon1s'/>
            </div>
            <h2 className='heading-h2s'>Cleaning follicles</h2>
            <p className='para-about1s'>Cleaning follicles with seed paste by adsorption.</p>
            </div>
            <div className='part3s'  data-aos='fade-up' data-aos-delay='100'>
            <div className='image-bg2s'>
            <img src={Image4} alt="image" className='img-icon1s'/>
            </div>
            <h2 className='heading-h2s'>Spraying Herbal Solution</h2>
            <p className='para-about1s'>Spraying Herbal Solution all over the scalp.</p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Regrowth