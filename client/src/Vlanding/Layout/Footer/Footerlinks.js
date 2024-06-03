import React from 'react';
import { Link } from 'react-scroll';
import { footerData } from './footerData';// Adjust the path accordingly

const Footerlinks = () =>{
    return (
        <footer>
          <div className="footer-section">
            <h4>{footerData.usefulLinks.head}</h4>
            <ul>
              {footerData.usefulLinks.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.toLowerCase()}
                    smooth
                    offset={-40}
                    duration={250}
                    spy
                    activeClass="active"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h4>{footerData.servicesLinks.head}</h4>
            <ul>
              {footerData.servicesLinks.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.toLowerCase()}
                    smooth
                    offset={-40}
                    duration={250}
                    spy
                    activeClass="active"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      );
}

export default Footerlinks;