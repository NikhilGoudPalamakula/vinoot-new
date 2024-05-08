import React from 'react'
import './Services.css'
import Vnavbar from './Vnavbar'
import Footer from './Footer'
// import service from "../../Images/service-banner.jpg"

const Services = () => {
    return (
        <div className='services-cont mt-16'>
            <Vnavbar />
            <div className='heading-cont'>
                <div id="fly-in">
                    {/* <div><span>Vinoot</span>Hair & Skin</div>
                    <div>Ayurveda<span>Franchise Opportunity</span></div>
                    <div>Direct and Online consultation <span>for Hair Re Growth</span></div>
                    <div><span>Hair health / dandruff / hairfall</span>Treatments</div>
                    <div><span>Vinoot</span>Hair & Skin</div>
                    <div>Yoga Aspects<span>For Healthy Life.</span></div>
                    <div>Child Care <span> Nutrition</span></div>
                    <div><span>Vinoot</span>Hair & Skin</div> */}
                </div>
            </div>
            <div class="wrapper">
                <div class="box">
                    <div class="front-face">
                        <img src='https://vinootherbals.com/images/service1.jpg'/>
                        {/* <img src={service} alt="" /> */}
                    </div>
                    <div class="back-face">
                        <span>Hair Renewal</span>
                        <p>
                        Direct and Online Consultation for Hair regrowth & Health maintenance by our inventor of our “Herbal hair care solution.</p>
                    </div>
                </div>
                <div class="box">
                <div class="front-face">
                        <img src='https://vinootherbals.com/images/service5.jpg'/>
                    </div>
                    <div class="back-face">
                        <span>Scalp Solutions</span>
                        <p>
                        Hair health maintenance by our inventor/ scientist “Herbal v hair care solution”.</p>
                    </div>
                </div>
                <div class="box">
                <div class="front-face">
                        <img src='https://vinootherbals.com/images/service3.jpg'/>
                    </div>
                    <div class="back-face">
                        <span>Yoga Wellness</span>
                        <p>
                        Yoga is a group of physical, mental, and spiritual practices or disciplines which originated in ancient India.</p>
                    </div>
                </div>
                <div class="box">
                <div class="front-face">
                        <img src='https://vinootherbals.com/images/service4.jpg'/>
                    </div>
                    <div class="back-face">
                        <span>"Family Wellness</span>
                        <p>
                        Healthy mind and body development of a child through lovely parents.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Services