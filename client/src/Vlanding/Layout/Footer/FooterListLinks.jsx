// import React from "react";
// import {MdKeyboardArrowRight} from "react-icons/md";
// import {FooterListLinksStyled} from "./footer.styled";
// const FooterListLinks = ({head, links}) => {
//   return (
//     <FooterListLinksStyled>
//       <h4>{head}</h4>
//       <ul className="categoriesList">
//         {links.map((link, idx) => (
//           <li key={idx}>
//             <MdKeyboardArrowRight />
//             {link}
//           </li>
//         ))}

     
//       </ul>
//     </FooterListLinksStyled>
//   );
// };

// export default FooterListLinks;
import React from "react";
import { Link } from "react-scroll";
import {MdKeyboardArrowRight} from "react-icons/md";
 import {FooterListLinksStyled} from "./footer.styled";
const FooterListLinks = ({ head, links }) => {
  return (
    <div>
      <FooterListLinksStyled>
        <h4>{head}</h4>
      <ul className="categoriesList">
        {links.map((link, idx) => (
          
          <li key={idx}>
            <Link
              to={link.toLowerCase()}
              smooth
              offset={-40}
              duration={250}
              spy
              activeClass="active"
             
            > <MdKeyboardArrowRight />
              {link}
            </Link>
          </li>
        ))}
      </ul>
      </FooterListLinksStyled>
    </div>
  );
};

export default FooterListLinks;
