import React from "react";
import {MdKeyboardArrowRight} from "react-icons/md";
import {FooterListLinksStyled} from "./footer.styled";
const FooterListLinks = ({head, links}) => {
  return (
    <FooterListLinksStyled>
      <h4>{head}</h4>
      <ul className="categoriesList">
        {links.map((link, idx) => (
          <li key={idx}>
            <MdKeyboardArrowRight />
            {link}
          </li>
        ))}

     
      </ul>
    </FooterListLinksStyled>
  );
};

export default FooterListLinks;
