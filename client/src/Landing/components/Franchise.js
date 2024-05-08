import React from "react";
import Vnavbar from "./Vnavbar";
import Footer from "./Footer";
import "./Franchise.css";
import ContactFranch from "./ContactFranch";
import wimg1 from "../assets/img/wimg1.jpg";
import wimg2 from "../assets/img/wimg2.jpg";
import wimg3 from "../assets/img/wimg3.jpg";
import Blogs from "../../../E-commerce/components/Blogs/Blogs";

import Img1 from "../../../E-commerce/assets/blogs/haircare3.jpg";
import Img2 from "../../../E-commerce/assets/blogs/haircare5.jpg";
import Img3 from "../../../E-commerce/assets/blogs/haircare4.jpg";

const BlogData = [
  {
    title: "How to choose perfect skin oil",
    subtitle:
      "minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae laudantium. Porro?",
    published: "",
    image: Img1,
    aosDelay: "0",
  },
  {
    title: "How to choose perfect hair oil",
    subtitle:
      "minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae laudantium. Porro?",
    published: "",
    image: Img2,
    aosDelay: "200",
  },
  {
    title: "How to choose perfect skin cream",
    subtitle:
      "minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae laudantium. Porro?",
    published: "",
    image: Img3,
    aosDelay: "400",
  },
];

const Franchise = () => {
  return (
    <div>
      <Vnavbar />

    <div style={{ marginTop: "4rem" }}>
        <div className="d-flex">
 
       {/*       
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8 sm:gap-4 md:gap-7 mt-8 mb-4 p-8" >
          
          {BlogData.map((data) => (
            <div
              data-aos="fade-up"
              data-aos-delay={data.aosDelay}
              key={data.title}
              className="bg-white dark:bg-gray-900"
            >
              
              <div className="overflow-hidden rounded-2xl mb-2">
                <img
                  src={data.image}
                  alt=""
                  className="w-full h-[220px] object-cover rounded-2xl hover:scale-105 duration-500"
                />
              </div>
              
              <div className="space-y-2">
                <p className="text-xs text-gray-500">{data.published}</p>
                <p className="font-bold line-clamp-1">{data.title}</p>
                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {data.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>*/}

        </div> 

        <ContactFranch />
      </div>
 
      <Footer />
    </div>
  );
};

export default Franchise;
