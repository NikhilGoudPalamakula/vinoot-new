import React from 'react';
import { Link } from 'react-scroll';

const footerData = () => {
  const footerLinks = {
    usefulLinks: {
      head: "Useful Links",
      links: ["Home", "About", "Services", "Products", "Whyus", "Team", "Contact"],
    },
    servicesLinks: {
      head: "Our Services",
      links: [
        "Hair",
        "Skin",
      ],
    },
  };

  const { usefulLinks, servicesLinks } = footerLinks;
  return (
    <footer>
      <div className="footer-section">
        <h4>{usefulLinks.head}</h4>
        <ul>
          {usefulLinks.links.map((link, idx) => (
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
        <h4>{servicesLinks.head}</h4>
        <ul>
          {servicesLinks.links.map((link, idx) => (
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

export default footerData;
