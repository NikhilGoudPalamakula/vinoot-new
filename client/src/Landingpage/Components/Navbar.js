/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Logo from "../Assets/logo.png";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import { RiLoginCircleFill } from "react-icons/ri";
import { MdAppRegistration } from "react-icons/md";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      text: "Register for Franchise Form",
      icon: <MdAppRegistration />,
      path: "/fr",
    },
    {
      text: "Login",
      icon: <RiLoginCircleFill />,
      path: "/login",
    },
  ];
  return (
    <nav className="lan-navbar">
      <div className="nav-logo-container">
        <img src={Logo} style={{height:'15vh'}} alt="" />
      </div>
      <div className="navbar-links-container">
       <Link to="/"><button className="primary-button">Home</button></Link> 
       <Link to="/fr"><button className="primary-button">Register for Franchise</button></Link> 
        {/* <a href="">About</a>
        <a href="">Testimonials</a> */}
        {/* <a href="/fr">Register for Franchise</a> */}
        {/* <a href="">
          <BsCart2 className="navbar-cart-icon" />
        </a> */}
       <Link to="/login" > <button className="primary-button">Login</button> </Link> 
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
