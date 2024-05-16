import "./Landing.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
// import Testimonial from "./Components/Testimonial";
// import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Consultants from "./Components/Consultants";
// import Regrowth from "./Components/Regrowth";
function Landingvinoot() {
  return (
    <div className="App-container">
      <Home />
      <About />
      <Work />
       {/* <Regrowth/> */}
      <Consultants/>
      {/* <Contact /> */}
      <Footer />
    </div>
  );
}

export default Landingvinoot;
