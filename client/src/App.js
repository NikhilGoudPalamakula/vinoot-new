
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
import Home from './Home/Home';
import TreatmentCategory from './Masterdata/Categorymasterdata/Category';
import TreatmentPlan from './Masterdata/Treatmentplanmaster/Plan';
import PatientForm from './Franchisemanagement/Patientdetails/Addpatient';


function App() {
  return (

    <Router>
      <Routes>

        {/* Mastar data */}
        <Route path="/" element={<Home />} />


        <Route path="*" element={<NotFound />} />

        <Route path="/superadminlogin" element={<LoginPage />} />
        <Route path="/fl" element={<FranchiseLogin />} />

        <Route path="/fr" element={<FranchiseReg />} />

        <Route element={<PrivateRoute />}>

          <Route path="/FrSidebar" element={<FranchiseAdmintable />} />
          <Route path="/Sidebar" element={<Sidebar />} />
          <Route path="/MasterUsert" element={<MasterUserT />} />
          <Route path="/reg" element={<RegisterPage />} />

          <Route path="/States" element={<States />} />
          <Route path="/Cities" element={<Cities />} />
          <Route path="/Area" element={<Area />} />
          <Route path="/TreatmentCategory" element={<TreatmentCategory />} />
          <Route path="/TreatmentPlan" element={<TreatmentPlan />} />
        </Route>

        <Route path="/Patientdetails" element={<PatientForm />} />
    
      </Routes>
    </Router>

  );
}

export default App;
