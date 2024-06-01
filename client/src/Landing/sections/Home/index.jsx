import React from "react";
import {Container} from "react-bootstrap";
import CustomButton from "../../components/CustomButton";
import {HomeSectionStyled} from "./home.styled";
import "./button.css";
import homeImg from "../../assets/bg.png.jpg";
const Home = () => {
  return (
    <HomeSectionStyled
      id={"home"}
      className="home-sec d-flex align-items-center"
      style={{
        background: `url(${homeImg}) top center no-repeat`,
        height: "calc(100vh - 100px)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <Container className="home-container animate__animated animate__lightSpeedInLeft">
        <h1>WELCOME TO VINOOT</h1>
        <h2>
        Vinoot Herbal merges Ayurvedic wisdom with modernity, offering franchise opportunities to revolutionize hair and skin care with natural solutions and well-being.
        </h2>
        <div style={{display:'flex',gap:'1rem'}}>
        {/* <CustomButton type="btn-on-img">Login</CustomButton> */}
          <button type="button" class="btnl">
            <strong>Login</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>

            <div id="glow">
              <div class="circle"></div>
              <div class="circle"></div>
            </div>
          </button>

        {/* <CustomButton type="btn-on-img">Register for Franchise</CustomButton> */}
        <button type="button" class="btnr">
          <strong>Register for Franchise</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>

          <div id="glow">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </button>

        </div>
        
      </Container>
    </HomeSectionStyled>
  );
};

export default Home;
