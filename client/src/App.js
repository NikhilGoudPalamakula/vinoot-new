
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './Reception/sidebar';
import NotFound from './pages/NotFound';
import PrivateRoute from './MasterLogin/PrivateRoute';
import RegisterPage from './MasterLogin/RegisterPage';
import LoginPage from './MasterLogin/LoginPage';
import MasterUserT from './MasterLogin/MasterUserT';
import FranchiseReg from './MasterLogin/FranchiseReg';
<<<<<<< HEAD
import FranchiseLogin from './MasterLogin/FranchiseLogin';
import FranchiseAdmintable from './MasterLogin/FranchiseAdmintable';
import FranchiseSidebar from './Reception/FranchiseSidebar';
=======
import States from './Masterdata/Statemaster/State';
import Cities from './Masterdata/Citymaster/City';
import Area from './Masterdata/Areamaster/Area';
>>>>>>> 4fd98773a76dbe1a186a97064566b2eee949e4a7


function App() {
  return (
  
    <Router>
     
     
    <Routes>
 
    <Route path="*" element={<NotFound />} />

    <Route path="/reg" element={<RegisterPage/>}/>
    <Route path="/" element={<LoginPage/>}/>
    <Route path="/fl" element={<FranchiseLogin/>}/>
    

      
<<<<<<< HEAD
    <Route element={<PrivateRoute/>}>
    <Route path="/FrSidebar" element={<FranchiseSidebar/>}/>
=======
     <Route element={<PrivateRoute/>}>
>>>>>>> 4fd98773a76dbe1a186a97064566b2eee949e4a7
  
      <Route path="/Sidebar" element={<Sidebar/>}/>
      <Route path="/MasterUsert" element={<MasterUserT/>}/>
      <Route path="/FranchiseAdmintable" element={<FranchiseAdmintable/>}/>
      <Route path="/fr" element={<FranchiseReg/>}/>
      


       {/* Mastar data */}

       <Route path="/States" element={<States/>}/>
       <Route path="/Cities" element={<Cities/>}/>
       <Route path="/Area" element={<Area/>}/>
       
      </Route>
      
     
    </Routes>
  </Router>

  );
}

export default App;
