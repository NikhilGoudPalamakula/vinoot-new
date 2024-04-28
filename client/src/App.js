
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './Reception/sidebar';
import NotFound from './pages/NotFound';
import PrivateRoute from './MasterLogin/PrivateRoute';
import RegisterPage from './MasterLogin/RegisterPage';
import LoginPage from './MasterLogin/LoginPage';
import MasterUserT from './MasterLogin/MasterUserT';
import FranchiseReg from './MasterLogin/FranchiseReg';
import FranchiseLogin from './MasterLogin/FranchiseLogin';
import FranchiseAdmintable from './MasterLogin/FranchiseAdmintable';
import FranchiseSidebar from './Reception/FranchiseSidebar';


function App() {
  return (
   
    <Router>
    <Routes>
 
    <Route path="/reg" element={<RegisterPage/>}/>
    <Route path="/" element={<LoginPage/>}/>
    <Route path="/fl" element={<FranchiseLogin/>}/>
    

      
    <Route element={<PrivateRoute/>}>
    <Route path="/FrSidebar" element={<FranchiseSidebar/>}/>
  
      <Route path="/Sidebar" element={<Sidebar/>}/>
      <Route path="/MasterUsert" element={<MasterUserT/>}/>
      <Route path="/FranchiseAdmintable" element={<FranchiseAdmintable/>}/>
      <Route path="/fr" element={<FranchiseReg/>}/>
      

</Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>

  );
}

export default App;
