import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { HiOutlineMenu } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { HeaderStyled } from "./header.styled";
import { Link } from "react-scroll";
import logo from "../../assets/logo.png";

const navlinks = [
  "Home",
  "About",
  "Services",
  "Products",
  "Whyus",
  "Doctors",
  "Contact",
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navBarScrolled, setNavBarScrolled] = useState(false);

  const handleResize = () => {
    if (window.innerWidth >= 992) {
      setIsOpen(false);
    }
  };

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNavBarScrolled(true);
    } else {
      setNavBarScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  }, []);

  return (
    <HeaderStyled className={navBarScrolled ? "active" : ""}>
      <Navbar expand="lg">
        <Container>
          <Link to="home" smooth>
            <img src={logo} alt="Logo" style={{ height: "5rem", width: "10rem" }} />
          </Link>
          <Navbar.Toggle aria-controls="navbar-nav" onClick={() => setIsOpen(!isOpen)}>
            <HiOutlineMenu className="menu-icon" />
          </Navbar.Toggle>
          <Navbar.Collapse id="navbar-nav" className={`justify-content-end ${isOpen ? 'show' : ''}`}>
            <Nav>
              {navlinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.toLowerCase()}
                  smooth
                  offset={-40}
                  duration={250}
                  spy
                  activeClass="active"
                  onClick={() => window.innerWidth <= 992 && setIsOpen(!isOpen)}
                  className="nav-link"
                >
                  {link}
                </Link>
              ))}
            </Nav>
            {isOpen && <MdClose className="d-block d-lg-none close-icon" color="red" onClick={() => setIsOpen(false)} />}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </HeaderStyled>
  );
};

export default Header;
