
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './Reception/sidebar';
import NotFound from './pages/NotFound';
import PrivateRoute from './MasterLogin/PrivateRoute';
import RegisterPage from './MasterLogin/AddSuperAdmin/RegisterPage';
import LoginPage from './MasterLogin/LoginPage';
import MasterUserT from './MasterLogin/Masterusers/MasterUserT';
import FranchiseReg from './MasterLogin/Franchiseregistration/FranchiseReg';
import States from './Masterdata/Statemaster/State';
import Cities from './Masterdata/Citymaster/City';
import Area from './Masterdata/Areamaster/Area';
import FranchiseLogin from './MasterLogin/FranchiseLogin';
import FranchiseAdmintable from './MasterLogin/Franchisedetails/FranchiseAdmintable';
import Home from './Home/Home';
import TreatmentCategory from './Masterdata/Categorymasterdata/Category';
import TreatmentPlan from './Masterdata/Treatmentplanmaster/Plan';
import PatientForm from './Franchisemanagement/Reception/Patientdetails/Addpatient';
import FranchiseStaffReg from './Franchisemanagement/Franchiseadmin/FranchisestaffReg/FranchiseStaffReg';
import SuperSidebar from './Masterdata/Sidebar/Sidebar';
import LoginForm from './Login/LoginForm'
import Thearpy from './Franchisemanagement/Thearpy';
import Doctor from './Franchisemanagement/Doctor';
import Recepttion from './Franchisemanagement/Reception/Recepttion';
import Billing from './Franchisemanagement/Reception/Billing/Billing';
import FranchiseAdmin from './Franchisemanagement/Franchiseadmin/Franchisestaff/FranchiseAdmin';
import Franchisepatients from './MasterLogin/Franchisepatients/Franchisepatients';
import Franchisepatientbilling from './MasterLogin/Franchisepatientbilling/Franchisepatientbilling';
import Franchisestaffdetails from './Franchisemanagement/Franchiseadmin/FranchisestaffReg/Franchisestaffdetails';
import Franchisetogglebutton from './Franchisemanagement/Franchiseadmin/Franchise-s/Togglebutton';
import AdminTogglebutton from './MasterLogin/FranchiseAdmin-s/AdminTogglebutton';
import Togglepatients from './Franchisemanagement/Reception/Patientdetails/FranchiseToggledetails/Togglepatients';
import FranchiseLoginDetailsIcon from './Franchisemanagement/Franchiseadmin/FranchiseLoginDetailsIcon';

function App() {
  return (

    <Router>
      <Routes>

        {/* Mastar data */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<Home />} />


        <Route path="*" element={<NotFound />} />

        <Route path="/superadminlogin" element={<LoginPage />} />
        <Route path="/fl" element={<FranchiseLogin />} />

        <Route path="/fr" element={<FranchiseReg />} />

        <Route element={<PrivateRoute />}>

          <Route path="/FrSidebar" element={<FranchiseAdmintable />} />
          <Route path="/Sidebar" element={<Sidebar />} />
          <Route path="/MasterUsert" element={<MasterUserT />} />
          {/* <Route path="/reg" element={<RegisterPage />} /> */}
          <Route path="/reg" element={<RegisterPage />} />
          <Route path="/fsr" element={<FranchiseStaffReg />} />

          <Route path="/States" element={<States />} />
          <Route path="/Cities" element={<Cities />} />
          <Route path="/Area" element={<Area />} />
          <Route path="/TreatmentCategory" element={<TreatmentCategory />} />
          <Route path="/TreatmentPlan" element={<TreatmentPlan />} />


          <Route path="/FranchiseAdmin" element={<FranchiseAdmin />} />
          <Route path="/Thearpy" element={<Thearpy />} />
          <Route path="/Doctor" element={<Doctor />} />
          <Route path="/Recepttion" element={<Recepttion />} />


          <Route path="/Franchisepatients" element={<Franchisepatients />} />
          <Route path="/Patientdetails" element={<PatientForm />} />

          <Route path="/Billing" element={<Billing />} />
          <Route path="/Franchisepatientbilling" element={<Franchisepatientbilling />} />
          <Route path="/SuperSidebar" element={<SuperSidebar />} />
        <Route path="/Franchisestaffdetails" element={<Franchisestaffdetails />} />
        <Route path="/Franchisetogglebutton" element={<Franchisetogglebutton />} />
        <Route path="/Franchiseadmintogglebutton" element={<AdminTogglebutton />} />
        <Route path="/Franchisetogglepatients" element={<Togglepatients />} />


          

        </Route>
        <Route path="/FranchiseLoginDetailsIcon" element={<FranchiseLoginDetailsIcon />} />


       {/* <FranchiseLoginDetailsIcon/> */}

      </Routes>
    </Router>

  );
}

export default App;
