
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './Reception/sidebar';
import NotFound from './pages/NotFound';
import PrivateRoute from './MasterLogin/PrivateRoute';
import RegisterPage from './MasterLogin/RegisterPage';
import LoginPage from './MasterLogin/LoginPage';
import MasterUserT from './MasterLogin/MasterUserT';
import FranchiseReg from './MasterLogin/FranchiseReg';
import States from './Masterdata/Statemaster/State';
import Cities from './Masterdata/Citymaster/City';
import Area from './Masterdata/Areamaster/Area';
import FranchiseLogin from './MasterLogin/FranchiseLogin';
import FranchiseAdmintable from './MasterLogin/FranchiseAdmintable';


function App() {
  return (
  
    <Router>
     
     
    <Routes>

        {/* Mastar data */}

        <Route path="/States" element={<States/>}/>
       <Route path="/Cities" element={<Cities/>}/>
       <Route path="/Area" element={<Area/>}/>
 
    <Route path="*" element={<NotFound />} />

    <Route path="/reg" element={<RegisterPage/>}/>
    <Route path="/" element={<LoginPage/>}/>
    <Route path="/fl" element={<FranchiseLogin/>}/>
   

      
     <Route element={<PrivateRoute/>}>
     <Route path="/FrSidebar" element={<FranchiseAdmintable/>}/>
      <Route path="/Sidebar" element={<Sidebar/>}/>
      <Route path="/MasterUsert" element={<MasterUserT/>}/>
      <Route path="/fr" element={<FranchiseReg/>}/>
    

     
       
      </Route>
      
     
    </Routes>
  </Router>

  );
}

export default App;
