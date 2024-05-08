import React from 'react'
import './Banner.css';
import Slider from 'react-slick';
// import 'slider-curousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {
  const settings = {
    dots:true,
    infinite:true,
    speed:500,
    slidesToShow:1,
    slidesToScroll:1,
    autoplay:true,
    autoplaySpeed:3000,
    arrows:false
  }
  return (
    <div className='banner-container'>
      {/* <Slider {...settings}>
<div>
  <img className='b' src='https://www.shutterstock.com/shutterstock/photos/1774721042/display_1500/stock-photo-close-up-view-of-mortar-salt-oil-and-herbal-compress-on-white-back-banner-1774721042.jpg'/>
</div>
<div>
  <img className='b' src='https://cdn.vectorstock.com/i/1000x1000/20/28/aromatherapy-spa-treatment-cosmetic-beauty-banner-vector-38392028.webp'/>
</div>
      </Slider> */}
         <div className='heading-cont-banner'>
                <div id="fly-in-banner">
                    <div><span>Vinoot</span>Hair & Skin</div>
                    <div>Ayurveda<span>Franchise Opportunity</span></div>
                    <div>Direct and Online consultation <span>for Hair Re Growth</span></div>
                    <div><span>Hair health / dandruff / hairfall</span>Treatments</div>
                    <div><span>Vinoot</span>Hair & Skin</div>
                    <div>Yoga Aspects<span>For Healthy Life.</span></div>
                    <div>Child Care <span> Nutrition</span></div>
                </div>
            </div>
    </div>
  )
}

export default Banner