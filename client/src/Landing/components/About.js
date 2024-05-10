
import React from 'react';
import './About.css'; 

import './Footer'
import img51 from '../assets/img/aboutus.jpg'
import img52 from '../assets/img/myphoto.jpg'
import img53 from '../assets/img/our-mission.jpg.png'
import img54 from '../assets/img/our_vision.jpg.png'
import img55 from '../assets/img/why_withusnew.png'

import { motion } from "framer-motion";
import Footer from './Footer';
import Vnavbar from './Vnavbar';
import Faqslan from './Faqslan';
import ContactFranch from './ContactFranch';
const AboutUsPage = () => {
  
  const text = "Since 2009, Our History".split(" ");
  return (
    <div className="about-us-page mt-16">
      <Vnavbar/>
      {/* <div className='img1'>
        <img className='img51' src={img51} alt='' /> 
        <div className='texttotal'>
          <h2 style={{fontSize:'4rem',fontWeight:'bold',color:'	white'}}>About Us</h2>
          <h4 style={{color:'	white'}}> <span style={{fontWeight:'bold',fontSize:'2.3rem'}}>Mission : </span>Promoting Ayurveda Franchise opportunity</h4>
          <h4 style={{color:'	white'}}><span style={{fontWeight:'bold',fontSize:'2.3rem'}}>Vision :  </span>Healing Through Herbal</h4>
        </div>
      </div> */}
      {/* <div className="Whyhead1">
        <img
          src="https://vinootherbal.com/wp-content/uploads/2024/02/cover.png"
          alt=""
        />

        <h1>About Us</h1>
      </div> */}
          <div className='flex99'>
            <div class="flip-card">
              <div class="cardup">
                
                <div class="bg"><img className='mypic' src={img52} alt=''  style={{height:'100%',borderRadius:'1rem' }}/></div>
                <div class="blob"></div>
                
              </div>

          </div>
          <div className='matter'>
              <div className="App89" style={{fontSize:'2.5rem',fontWeight:'bold',color:'#006733', padding:'0px 0px 0px 60px'}}>
                {text.map((el, i) => (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 1.25,
                      delay: i / 10,
                    }}
                    key={i}
                  >
                    {el}{" "}
                  </motion.span>
                ))}
              </div>
           
            <p style={{textAlign:'justify', padding:'30px 60px 0px 60px'}}> 
              As the founding father of Vinoot Herbal Products, I, <span style={{fontWeight:'bold'}}>Channabasappa Ullagaddi</span> a science graduate with 18 years of experience in the petrochemical industry in India & Abroad. Upon returning from abroad, I developed a keen interest in Ayurveda due to a personal encounter with a young woman experiencing hair loss issues. This led me to invent a herbal product for hair regrowth, which has garnered positive feedback and secured a patent. Establishing Vinoot Herbal Specialities Pvt Ltd in Bangalore in 2010, I later founded Vinoot Herbal Specialities, focusing on hair regrowth therapies in 2017. With over 1500 successful treatments, I am now expanding through a franchise model to make our therapies accessible to all. Despite interest from a top FMCG company, we opted to retain ownership of our patented herbal molecules.
            </p>
          </div>
        </div>

        <div className='container00'>
             <div className='matter'>
                <h2 className='mission' style={{fontSize:'2.5rem',fontWeight:'bold',color:'	#006733'}}>Our Mission</h2>
                <motion.p initial={{ x: -300, y: 150 }}
                           whileInView={{ x: 0, y: 0 }}
                           transition={{ duration: 1.2 }} style={{textAlign:'justify'}}>At Vinoot Herbal, our aim is to transform the hair care industry by utilizing the oldest knowledge of Ayurveda. Our mission is to use the power of natural herbal components to effectively treat dandruff, hair loss, and hair regrowth. By offering franchise business opportunities, we hope to enable company owners to work with us to share the gift of Ayurveda with the world, making sure that our cutting-edge treatments are available to everyone. Our commitment to providing top-notch products and therapies that not only solve hair care issues but also increase general well-being comes from the combination of ancient knowledge with present production processes. By working together, we hope to establish a network of natural health and renewal where people can benefit from the life-changing effects of Ayurvedic hair care.
                </motion.p>
             </div>
             <motion.img   initial={{ x: 300, y: -150 }}
                           whileInView={{ x: 0, y: 0 }}
                           transition={{ duration: 1.2 }}
                           src={img53} alt='' style={{width:'25%'}}/>
          </div>
          <div className='container002'>
          <motion.img initial={{ x: -300, y: 150 }}
                           whileInView={{ x: 0, y: 0 }}
                           transition={{ duration: 1.2 }}
                           src={img54} alt='' style={{width:'25%'}}/>
             <div className='matter'>
                <h2 className='vision' style={{fontSize:'2.5rem',fontWeight:'bold',color:'#006733'}}>Our Vision</h2>
                <motion.p initial={{ x: 300, y: -150 }}
                           whileInView={{ x: 0, y: 0 }}
                           transition={{ duration: 1.2 }} style={{textAlign:'justify'}}>Our vision at Vinoot Herbal is to become a global leader in Ayurvedic hair care, setting new standards of excellence and innovation in addressing hair fall, dandruff, and hair regrowth concerns. Through our franchise business opportunity, we aim to create a vast network of dedicated partners who share our passion for holistic wellness and natural healing. By leveraging the ancient wisdom of Ayurveda and modern scientific advancements, we envision offering comprehensive solutions that not only restore hair health but also enhance overall vitality and confidence. Our goal is to empower individuals worldwide to embrace the benefits of Ayurvedic hair care, fostering a culture of self-care and well-being that transcends geographical boundaries. Together, we envision a future where every individual can enjoy healthy, beautiful hair through the transformative power of Vinoot Herbal’s Ayurvedic therapies.
                </motion.p>
             </div>
          </div>
          <h2 style={{fontSize:'2.6rem',fontWeight:'bold',color:'	#006733',marginTop:'5%',textAlign:'center'}}>Why Choose us</h2>
         <div className='flex034'>
          <div className="top-specialties">
          <h4>TOP SPECIALTIES OF OUR RESEARCH CENTRE:</h4>
          <ul>
            <li>Hair Regrowth (alopecia) treatment for 30 days, 30 each sittings duration is around 30-40 minutes. For men below 40 yrs., women below 50 yrs, and children’s of all age.</li>
            <li>Hair health treatments: single sitting, 7 days, weekly, monthly basis, depending on condition. For all men, women and children of all ages.</li>
            <li>Our Herbal Spray is First of kind in India.</li>
            <li>Franchise training and certified courses for Hair regrowth therapies.</li>
          </ul>
        </div>
        <img className='mark' style={{background:'none'}} src={img55} alt='' />
    </div>
    <div className="elementor-widget-wrap elementor-element-populated">
      <div className="elementor-element elementor-element-43a7770 elementor-widget elementor-widget-video" data-id="43a7770" data-element_type="widget" data-settings="{&quot;youtube_url&quot;:&quot;https:\/\/youtu.be\/0lqxW5SkrXA?si=IxDSMBdI9C7gRUDX&quot;,&quot;video_type&quot;:&quot;youtube&quot;,&quot;controls&quot;:&quot;yes&quot;}" data-widget_type="video.default">
        <div className="elementor-widget-container">
          <div className="elementor-wrapper elementor-open-inline">
            <iframe className="elementor-video" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title="Hair Fall, Dandruff, Hair Regrowth for Men, Women &amp; Children" width="640" height="360" src="https://www.youtube.com/embed/0lqxW5SkrXA?controls=1&amp;rel=0&amp;playsinline=0&amp;modestbranding=0&amp;autoplay=0&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fvinootherbal.com&amp;widgetid=1" id="widget2"></iframe>
          </div>
        </div>
      </div>
    </div>
    <h2 style={{fontSize:'4rem',fontWeight:'bold',color:'	#006733',marginTop:'5%',textAlign:'center'}}>FAQ</h2>
    
    <Faqslan/>
    {/* <ContactFranch/> */}
    <Footer/>
    </div>
  );
};

export default AboutUsPage;
