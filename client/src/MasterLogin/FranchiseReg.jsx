import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const FranchiseReg = () => {

  const navigate   = useNavigate();
  const [franchiseData, setFranchiseData] = useState({
    franchisename: "",
    FranchiseID: "",
    mobileNumber: "",
    country: "",
    state: "",
    city: "",
    area: "",
    address: "",
    pincode: "",
  });

  const [adminData, setAdminData] = useState({
    username: "",
    Adminid: "",
    franchisename: "",
    FranchiseID: "",
    designation: "FranchiseAdmin",
    email: "",
    password: "",
  });



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update adminData and franchiseData with the current values from state and localStorage
      const createdBy = localStorage.getItem('username');

      // Update adminData
      const updatedAdminData = {
        ...adminData,
        franchisename: franchiseData.franchisename,
        FranchiseID: franchiseData.FranchiseID,
        createdBy: createdBy // Add CreatedBy from localStorage
      };

      // Update franchiseData
      const updatedFranchiseData = {
        ...franchiseData,
        createdBy: createdBy // Add CreatedBy from localStorage
      };

      // Make the POST request with updated adminData
      await axios.post("http://localhost:5001/api/admin", updatedAdminData);
      console.log("admin Data:", updatedAdminData);

      // Now make the POST request with updated franchiseData
      await axios.post("http://localhost:5001/api/franchise", updatedFranchiseData);
      console.log("Franchise Data:", updatedFranchiseData);

      alert("Data submitted successfully.");
      navigate("/Sidebar")

    } catch (error) {
      console.error("Failed to submit data", error);
      alert("Failed to submit data. Please try again.");
    }
  };



  const handleFranchiseInputChange = (e) => {
    setFranchiseData({ ...franchiseData, [e.target.name]: e.target.value });
  };

  const handleAdminInputChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h2>Franchise Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="franchisename"
          value={franchiseData.franchisename}
          onChange={handleFranchiseInputChange}
          placeholder="Franchise Name"
          required
        />
        <input
          type="text"
          name="FranchiseID"
          value={franchiseData.FranchiseID}
          onChange={handleFranchiseInputChange}
          placeholder="Franchise ID"
          required
        />
        <input
          type="text"
          name="mobileNumber"
          value={franchiseData.mobileNumber}
          onChange={handleFranchiseInputChange}
          placeholder="Mobile Number"
        />
        <input
          type="text"
          name="country"
          value={franchiseData.country}
          onChange={handleFranchiseInputChange}
          placeholder="Country"
        />
        <input
          type="text"
          name="state"
          value={franchiseData.state}
          onChange={handleFranchiseInputChange}
          placeholder="State"
        />
        <input
          type="text"
          name="city"
          value={franchiseData.city}
          onChange={handleFranchiseInputChange}
          placeholder="City"
        />
        <input
          type="text"
          name="area"
          value={franchiseData.area}
          onChange={handleFranchiseInputChange}
          placeholder="Area"
        />
        <input
          type="text"
          name="address"
          value={franchiseData.address}
          onChange={handleFranchiseInputChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="pincode"
          value={franchiseData.pincode}
          onChange={handleFranchiseInputChange}
          placeholder="Pincode"
        />

        <h2>Admin Form</h2>
        <input
          type="text"
          name="username"
          value={adminData.username}
          onChange={handleAdminInputChange}
          placeholder="username"
        />
        <input
          type="text"
          name="Adminid"
          value={adminData.Adminid}
          onChange={handleAdminInputChange}
          placeholder="Admin ID"
        />
        {/* <input
          type="text"
          name="designation"
          value={adminData.designation}
          onChange={handleAdminInputChange}
          placeholder="Designation"
        /> */}
        <input
          type="text"
          name="email"
          value={adminData.email}
          onChange={handleAdminInputChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="password"
          value={adminData.password}
          onChange={handleAdminInputChange}
          placeholder="Password"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FranchiseReg;



// import React, { useState } from "react";
// import axios from "axios";
// import "./FranchiseReg.css";
// import { Link } from "react-router-dom";

// const FranchiseReg = () => {

//   const [franchiseData, setFranchiseData] = useState({
//     franchisename: "",
//     FranchiseID: "",
//     mobileNumber: "",
//     country: "",
//     state: "",
//     city: "",
//     area: "",
//     address: "",
//     pincode: "",
//   });

//   const [adminData, setAdminData] = useState({
//     username: "",
//     Adminid: "",
//     franchisename: "",
//     FranchiseID: "",
//     designation: "",
//     email: "",
//     password: "",
//   });



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Update adminData and franchiseData with the current values from state and localStorage
//       const createdBy = localStorage.getItem('username');

//       // Update adminData
//       const updatedAdminData = {
//         ...adminData,
//         franchisename: franchiseData.franchisename,
//         FranchiseID: franchiseData.FranchiseID,
//         createdBy: createdBy // Add CreatedBy from localStorage
//       };

//       // Update franchiseData
//       const updatedFranchiseData = {
//         ...franchiseData,
//         createdBy: createdBy // Add CreatedBy from localStorage
//       };

//       // Make the POST request with updated adminData
//       await axios.post("http://localhost:5001/api/admin", updatedAdminData);
//       console.log("admin Data:", updatedAdminData);

//       // Now make the POST request with updated franchiseData
//       await axios.post("http://localhost:5001/api/franchise", updatedFranchiseData);
//       console.log("Franchise Data:", updatedFranchiseData);

//       alert("Data submitted successfully.");

//     } catch (error) {
//       console.error("Failed to submit data", error);
//       alert("Failed to submit data. Please try again.");
//     }
//   };



//   const handleFranchiseInputChange = (e) => {
//     setFranchiseData({ ...franchiseData, [e.target.name]: e.target.value });
//   };

//   const handleAdminInputChange = (e) => {
//     setAdminData({ ...adminData, [e.target.name]: e.target.value });
//   };
//   return (
//     <div className="body">
//       <h2 className="fr">Franchise Registration</h2>
//       <div className="Frame">
//         <h2 className="h2">Franchise Form</h2>
//         <form className="form" onSubmit={handleSubmit}>
//           <div className="flex1" >
//             <label>
//               <input
//                 className="input1"
//                 type="text"
//                 placeholder=""
//                 required
//                 name="franchisename"
//                 value={franchiseData.franchisename}
//                 onChange={handleFranchiseInputChange}
//               />
//               <span>Franchise Name</span>
//             </label>
//           </div>
//           <div className="flex1" >
//             <label>
//               <input
//                 className="input1"
//                 type="text"
//                 name="FranchiseID"
//                 value={franchiseData.FranchiseID}
//                 onChange={handleFranchiseInputChange}
//                 placeholder=""
//                 required
//               />
//               <span>Franchise ID</span>
//             </label>
//           </div>
//           <div className="flex1" >
//             <label>
//               <input
//                 className="input1"
//                 type="text"
//                 name="mobileNumber"
//                 value={franchiseData.mobileNumber}
//                 onChange={handleFranchiseInputChange}
//                 placeholder=""
//                 required
//               />
//               <span>Mobile Number</span>
//             </label>
//           </div>
//           <div className="flex1" >
//             <label>
//               <input
//                 className="input1"
//                 type="text"
//                 name="country"
//                 value={franchiseData.country}
//                 onChange={handleFranchiseInputChange}
//                 placeholder=""
//                 required
//               />
//               <span>Country</span>
//             </label>
//           </div>
//           <div className="flex1" >
//             <label>
//               <input
//                 className="input1"
//                 type="text"
//                 name="state"
//                 value={franchiseData.state}
//                 onChange={handleFranchiseInputChange}
//                 placeholder=""
//                 required
//               />
//               <span>State</span>
//             </label>
//           </div>
//           <div className="flex1a" >
//             <label>
//               <input
//                 className="input1"
//                 type="text"
//                 name="city"
//                 value={franchiseData.city}
//                 onChange={handleFranchiseInputChange}
//                 placeholder=""
//                 required
//               />
//               <span>City</span>
//             </label>
//           </div>
//           <div className="flex1b" >
//             <label>
//               <input
//                 className="input1"
//                 type="text"
//                 name="area"
//                 value={franchiseData.area}
//                 onChange={handleFranchiseInputChange}
//                 placeholder=""
//                 required
//               />
//               <span>Area</span>
//             </label>
//           </div>
//           <div className="flex1c" >
//             <label>
//               <textarea
//                 className="input1"
//                 type="text"
//                 name="address"
//                 value={franchiseData.address}
//                 onChange={handleFranchiseInputChange}
//                 placeholder=""
//                 required
//               />
//               <span>Address</span>
//             </label>
//           </div>
//           <div className="flex1d" >
//             <label>
//               <input
//                 className="input1"
//                 type="text"
//                 name="pincode"
//                 value={franchiseData.pincode}
//                 onChange={handleFranchiseInputChange}
//                 placeholder=""
//                 required
//               />
//               <span>Pincode</span>
//             </label>
//           </div>









//           <h2 className="Admin">Admin Form</h2>
//           <div className="flex2" >
//             <label>
//               <input
//                 className="input1"
//                 type="text"
//                 name="username"
//                 value={adminData.username}
//                 onChange={handleAdminInputChange}
//                 placeholder=""
//                 required
//               />
//               <span>username</span>
//             </label>
//           </div>
//           <div className="flex3" >
//             <label>
//               <input
//                 className="input1"
//                 type="text"
//                 name="Adminid"
//                 value={adminData.Adminid}
//                 onChange={handleAdminInputChange}
//                 placeholder=""
//                 required
//               />
//               <span>Admin ID</span>
//             </label>
//           </div>
//           {/* <div className="flex4" >
//             <label>
//               <input
//                 className="input1"
//                 type="text"
//                 name="designation"
//                 value={adminData.designation}
//                 onChange={handleAdminInputChange}
//                 placeholder=""
//                 required
//               />
//               <span>Designation</span>
//             </label>
//           </div> */}
//           <div className="flex5" >
//             <label>
//               <input
//                 className="input1"
//                 type="text"
//                 name="email"
//                 value={adminData.email}
//                 onChange={handleAdminInputChange}
//                 placeholder=""
//                 required
//               />
//               <span>Email</span>
//             </label>
//           </div>
//           <div className="flex6" >
//             <label>
//               <input
//                 className="input1"
//                 type="text"
//                 name="password"
//                 value={adminData.password}
//                 onChange={handleAdminInputChange}
//                 placeholder=""
//                 required
//               />
//               <span>Password</span>
//             </label>
//           </div>

//         </form>

//       </div>
//       <button className="submit1" type="submit">Submit</button>
//     </div>
//   );
// };

// export default FranchiseReg;