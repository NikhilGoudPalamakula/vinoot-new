// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { AiFillStar } from 'react-icons/ai';
// import "./Products.css"
// import { MdArrowRightAlt } from "react-icons/md";
// import { Link } from 'react-router-dom';
// const ProductCard = ({ images,title, productName, star, reviews, prevPrice, price, manufacturer, color, category }) => {
//   const firstImage = images?.[0]; 
//   return (
    
//     <div className="product-card">
//       <img src={images} alt={title} className="product-image" />
//       <div className="product-details">
//         <h3 className="product-title">{productName}</h3>
//         {/* <div className="product-rating">
//           {star} {reviews}
//         </div> */}
//         <div className="product-price">
//           <span className="new-price">₹{price}</span>
//         </div>
//         <div className="product-info">
//           <p>Company: {manufacturer}</p>
//           <p>Category: {category}</p>
//         </div>
//       </div>
//     </div>

//   );
// };

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:9080/product');
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);



//   const handleScroll = () => {
//     const container = containerRef.current;
//     if (container) {
//       const scrollLeft = container.scrollLeft;
//       const scrollWidth = container.scrollWidth;
//       const clientWidth = container.clientWidth;

//       // Add logic to determine when to load more cards
//       const remainingScroll = scrollWidth - scrollLeft - clientWidth;
//       const loadThreshold = 100; // Adjust the threshold as needed

//       if (remainingScroll < loadThreshold) {
//         // Add logic to load more cards here
//         // For example, fetch additional data and update the products array
//       }
//     }
//   };


//   return (
//     <div className='list-products987'>
//         {/* <h3 className='producttxt1'>PRODUCTS</h3> */}
//         <div class="wrapper nine">
//         <div>
//             <h3 class="rotate2">
//                 <span>P</span>
//                 <span>R</span>
//                 <span>O</span>
//                 <span>D</span>
//                 <span>U</span>
//                 <span>C</span>
//                 <span>T</span>
//                 <span>S</span>
//             </h3>
//         </div>
//     </div>
//     <div className="product-list" ref={containerRef} onScroll={handleScroll}>
        
//       {products.map((product, index) => (
//         <ProductCard key={index} {...product} />
//       ))}
//     </div>
//     <Link to='/Productss'>
//     {/* <a href='/Productss'> */}
//     <button class="cssbuttons-io-button">
//       View More
//       <div class="icon">
//         <svg
//           height="24"
//           width="24"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path d="M0 0h24v24H0z" fill="none"></path>
//           <path
//             d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
//             fill="currentColor"
//           ></path>
//         </svg>
//       </div>
//     </button>
//     {/* </a> */}
//     </Link>
//     </div>
//   );
// };

// export default ProductList;