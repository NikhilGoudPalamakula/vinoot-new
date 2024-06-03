import {useContext} from "react";
import Vinootlanding from "./pages/Vinootlanding/Index.jsx";
//Styles
import ThemeContext from "./contexts/ThemeContext";
import {ThemeProvider} from "styled-components";
import {GlobalStyles} from "./styles/GlobalStyles";
import "./Landing.css";

function Vlanding() {
  const {theme} = useContext(ThemeContext);
  return (
    <>
      <ThemeProvider theme={{theme}}>
        <GlobalStyles />
        <Vinootlanding />
      </ThemeProvider>
    </>
  );
}

export default Vlanding;
