// import icons
import { FaYoutube, FaInstagram, FaGithub } from 'react-icons/fa';
import { BsChatDotsFill } from 'react-icons/bs';

// import images
import Feature1Img from './assets/img/cartoonskin.jpg';
import Feature2Img from './assets/img/cartoonhair.jpg';
import Feature3Img from './assets/img/features/feature3.png';
import Feature4Img from './assets/img/features/feature4.png';
import Avatar1Img from './assets/img/testimonials/avatar1.png';
import Avatar2Img from './assets/img/testimonials/avatar2.png';
import Avatar3Img from './assets/img/testimonials/avatar3.png';
import LogoV2 from './assets/img/logo-v2.png';
import HeroImage from './assets/img/girl.jpg';
import Feature1BgImg from './assets/img/features/feature1_bg.png';
import Feature2BgImg from './assets/img/features/feature2_bg.png';
import Feature3BgImg from './assets/img/features/feature3_bg.png';
import Feature4BgImg from './assets/img/features/feature4_bg.png';
import img91 from './assets/img/our-mission.jpg.png'
import img92 from './assets/img/our_vision.jpg.png'

export const navigationData = [
  // {
  //   name: 'Home',
  //   href: '#',
  // },
  // {
  //   name: 'Products',
  //   href: '#',
  // },
  // {
  //   name: 'Services',
  //   href: '#',
  // },
  // {
  //   name: 'Contact Us',
  //   href: '#',
  // },
];

export const heroData = {
  title: `Natured by Nature, Ayurvedic Wellness Unveiled`,
  subtitle:
    'Natural Alchemy for Beautiful Hair and Glowing Skin - Unlocking the Secrets of Timeless Radiance',
  btnText: 'Explore Our Products',
  image: HeroImage,
};

export const aboutData = {
  image: img91,
  subtitle:
    'At Vinoot Herbal, our aim is to transform the hair care industry by utilizing the oldest knowledge of Ayurveda. Our mission is to use the power of natural herbal components to effectively treat dandruff, hair loss, and hair regrowth. By offering franchise business opportunities, we hope to enable company owners to work with us to share the gift of Ayurveda with the world, making sure that our cutting-edge treatments are available to everyone. Our commitment to providing top-notch products and therapies that not only solve hair care issues but also increase general well-being comes from the combination of ancient knowledge with present production processes. By working together, we hope to establish a network of natural health and renewal where people can benefit from the life-changing effects of Ayurvedic hair care.',
  title1: 'Our Mission' , 
  image2:img92,
  subtitle2:
    'Our vision at Vinoot Herbal is to become a global leader in Ayurvedic hair care, setting new standards of excellence and innovation in addressing hair fall, dandruff, and hair regrowth concerns. Through our franchise business opportunity, we aim to create a vast network of dedicated partners who share our passion for holistic wellness and natural healing. By leveraging the ancient wisdom of Ayurveda and modern scientific advancements, we envision offering comprehensive solutions that not only restore hair health but also enhance overall vitality and confidence. Our goal is to empower individuals worldwide to embrace the benefits of Ayurvedic hair care, fostering a culture of self-care and well-being that transcends geographical boundaries. Together, we envision a future where every individual can enjoy healthy, beautiful hair through the transformative power of Vinoot Herbal’s Ayurvedic therapies.',
    title2: 'Our Vission' , 
};

export const featuresData = {
  title: 'Services We Offer',
  subtitle:
    'Discover rejuvenation through our personalized Ayurvedic services—revitalizing hair, indulgent skin facials, and expert consultations. Tailored to enhance your unique beauty and overall well-being.',
  list: [
    {
      image: Feature2Img,
      bgImage: Feature2BgImg,
      title: 'Hair',
      description:
        'Direct and Online Consultation for Hair regrowth & Health maintenance by our inventor of our “Herbal hair care solution.',
      // linkText: 'Learn more',
      delay: '450',
    },
    {
      image: Feature1Img,
      bgImage: Feature1BgImg,
      title: 'Skin',
      description:
        'Where tradition and beauty converge. Let your skin be the canvas, and let natures palette paint a masterpiece of timeless radiance.',
      // linkText: 'Learn more',
      delay: '200',
    },
    // {
    //   image: Feature3Img,
    //   bgImage: Feature3BgImg,
    //   title: 'Print Out',
    //   description:
    //     'Print out service gives you convenience if someday you need print data, just edit it all and just print it.',
    //   linkText: 'Learn more',
    //   delay: '1000',
    // },
    // {
    //   image: Feature4Img,
    //   bgImage: Feature4BgImg,
    //   title: 'Product Received',
    //   description:
    //     'In our app you can see the delay time of your order...',
    //   linkText: 'Learn more',
    //   delay: '1300',
    // },
  ],
};

export const testimonialsData = [
  {
    image: Avatar1Img,
    name: 'Serena',
    web: 'rena.com',
    message:
      'Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.',
    delay: '300',
  },
  {
    image: Avatar2Img,
    name: 'Natalia',
    web: 'nataliya.com',
    message:
      'Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.',
    delay: '300',
  },
  {
    image: Avatar3Img,
    name: 'Vebin',
    web: 'vebin.com',
    message:
      'Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.',
    delay: '450',
  },
];

export const ctaData = {
  title: 'For more information Contact Us',
  subtitle: '',
  btnText1: 'Learn more',
  btnText2: 'Contact ',
};

export const footerData = {
  logo:"",
  address: 'Vinoth, 234 RR Nagar Hyderabad 99388',
  email: 'info@vinooth.in',
  phone: '+91-1234567890 (Main)',
  list1: [
    // {
    //   name: 'Profile',
    //   href: '#',
    // },
    // {
    //   name: 'Features',
    //   href: '#',
    // },
    // {
    //   name: 'Careers',
    //   href: '#',
    // },
    {
      name: 'DW News',
      href: '#',
    },
  ],
  list2: [
    {
      name: 'Support',
      href: '#',
    },
    {
      name: 'Sign Up',
      href: '#',
    },
    {
      name: 'Guide',
      href: '#',
    },
    {
      name: 'Reports',
      href: '#',
    },
    {
      name: 'Q & A',
      href: '#',
    },
  ],
  socialList: [
    {
      icon: <FaYoutube />,
      href: '#',
    },
    {
      icon: <FaInstagram />,
      href: '#',
    },
    {
      icon: <FaGithub />,
      href: '#',
    },
  ],
};

export const copyrightData = {
  text: '© Vinoot Ayurvedic, 2022. All rights reserved. Company Registration Number: 09833888.',
  icon: <BsChatDotsFill />,
};
