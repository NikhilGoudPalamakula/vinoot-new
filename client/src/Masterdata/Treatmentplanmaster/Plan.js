
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Plan.css";
// import { VINOOTNEW } from "../../Helper/Helper";
// import Sidebar from "../../Masterdata/Sidebar/Sidebar";

// const TreatmentPlan = () => {
//   const [categories, setCategories] = useState([]);
//   const [plans, setPlans] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [plan, setPlan] = useState("");
//   const [GST, setGST] = useState("");
//   const [GSTamount, setGSTamount] = useState("");
//   const [TotalAmount, setTotalAmount] = useState("");
//   const [days, setDays] = useState("");
//   const [price, setPrice] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(3); // Change this value as needed
//   const [errors, setErrors] = useState({
//     plan: "",
//     price: "",
//     gst: "",
//     gstamount: "",
//     days: "",
//   });
//   const navigate = useNavigate();

//   // Fetch categories
//   const fetchCategory = async () => {
//     try {
//       const response = await axios.get(`${VINOOTNEW}/api/treatment-category`);
//       const activeCategories = response.data.filter(
//         (category) => category.status === "active"
//       );
//       setCategories(activeCategories);
//     } catch (error) {
//       console.error("Error fetching category:", error);
//     }
//   };

//   // Fetch plans
//   const fetchPlans = async () => {
//     try {
//       const response = await axios.get(`${VINOOTNEW}/api/treatment-plan`);
//       setPlans(response.data);
//     } catch (error) {
//       console.error("Error fetching plans:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCategory();
//     fetchPlans();
//   }, []);

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = plans.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Other event handlers
//   const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
//   const handlePlanChange = (e) => {
//     const inputValue = e.target.value;
//     setPlan(inputValue);
//     if (inputValue.length < 15 || inputValue.length > 250) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         plan: "Plan must be between 15 and 250 characters.",
//       }));
//     } else {
//       setErrors((prevErrors) => ({ ...prevErrors, plan: "" }));
//     }
//   };
//   const handleGSTChange = (e) => {
//     const inputValue = e.target.value;
//     setGST(inputValue);
//     const numericRegex = /^[1-9][0-9]?$/; // Updated regex for GST
//     if (!numericRegex.test(inputValue)) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         gst: "GST must be between 1 and 99.",
//       }));
//     } else {
//       setErrors((prevErrors) => ({ ...prevErrors, gst: "" }));
//     }
//   };


  

//   // Inside the handleDaysChange function
//   const handleDaysChange = (e) => {
//     const inputValue = e.target.value;
//     setDays(inputValue); // Fixed issue: setDays instead of setPrice
//     const numericRegex = /^[1-9][0-9]{0,2}$/; // Updated regex for days
//     if (!numericRegex.test(inputValue)) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         days: "Days must be between 1 and 999.",
//       }));
//     } else {
//       setErrors((prevErrors) => ({ ...prevErrors, days: "" }));
//     }
//   };
//   const handlePriceChange = (e) => {
//     const inputValue = e.target.value;
//     setPrice(inputValue);
//     const numericRegex = /^[1-9][0-9]{1,5}$/;
//     if (!numericRegex.test(inputValue)) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         price: "Price must be between 10 and 999999.",
//       }));
//     } else {
//       setErrors((prevErrors) => ({ ...prevErrors, price: "" }));
//     }
//   };

//   // Submit plan
//   const handleSubmitPlan = async (e) => {
//     e.preventDefault();
//     if (errors.plan || errors.price || errors.days || errors.gst) {
//       alert("Please fix the errors before submitting.");
//       return;
//     }
//     try {
//       const noOfPlans = await axios.get(`${VINOOTNEW}/api/treatment-plan`);
//       const count = noOfPlans.data.length;

//       const plan_id = generateUniqueId(count + 0);
//       await axios.post(`${VINOOTNEW}/api/treatment-plan`, {
//         plan_id: plan_id,
//         category_name: selectedCategory,
//         plan_name: plan,
//         GST: GST,
//         GSTamount: GSTamount,
//         price: price,
//         days: days,
//         updatedAt: new Date().toLocaleString(),
//         status: "active",
//       });
//       alert("plan submittion successfully");
//       navigate("/TreatmentCategory");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Generate unique ID
//   const generateUniqueId = (count) => {
//     const paddedCount = (count + 1).toString().padStart(3, "0");
//     return "PLAN-" + paddedCount;
//   };

//   // Toggle status
//   const toggleStatus = async (plan_id, currentStatus) => {
//     try {
//       const newStatus = currentStatus === "active" ? "inactive" : "active";

//       await axios.put(`${VINOOTNEW}/api/treatment-plan/${plan_id}`, {
//         status: newStatus,
//         updatedAt: new Date().toLocaleString(), // Updated time
//       });

//       fetchPlans(); // Refresh the plan list after status change
//     } catch (error) {
//       console.error("Error toggling status:", error);
//     }
//   };

//   const [formData, setFormData] = useState({
//     fullName: "",
//     userId: "",
//     email: "",
//     phoneNumber: "",
//     dateOfBirth: "",
//     password: "",
//     confirmPassword: "",
//     gender: "",
//     userType: "SuperAdmin",
//     activeChangedBy: "none",
//     // createdBy: createdby,
//   });
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://localhost:5001/api/register",
//         formData
//       );
//       console.log("User registered:", res.data);
//       navigate("/");
//     } catch (error) {
//       console.error("Registration failed:", error.response.data.error);
//     }
//   };

//   return (
//     <div>
//       <div className="totalplan">
//         <div>
//           <Sidebar />
//         </div>
//         <div className="tplan-above-table1">
//           <div className="tplan-above-table">
//             <h1>Treatment Plan Master</h1>
//             <div>
//               <form className="super-regfrom" onSubmit={handleSubmitPlan}>
//                 <div className="tplan-total">
//                   <div className="tplan-flex">
//                     <label>
//                       <select
//                         className="tplan-input"
//                         value={selectedCategory}
//                         onChange={handleCategoryChange}
//                         placeholder=""
//                         required>
//                         <option value="">Select </option>
//                         {categories.map((item) => (
//                           <option key={item._id} value={item.category_name}>
//                             {item.category_name}
//                           </option>
//                         ))}
//                       </select>
//                       <span>Select Category  <span style={{ color: 'red' }}>*</span></span>
//                     </label>

//                     <label>
//                       <input
//                         className="tplan-input"
//                         type="text"
//                         // id="plan"
//                         value={plan}
//                         onChange={handlePlanChange}
//                         placeholder=""
//                         required
//                       />
//                       <span>Treatement Plan <span style={{ color: 'red' }}>*</span></span>
//                     </label>
//                     {errors.plan && (
//                       <div style={{ color: "red" }}>{errors.plan}</div>
//                     )}

//                     <div className="tplan-inbetween">


//                       <label>
//                         <input
//                           className="tplan-input"
//                           type="number"
//                           value={price}
//                           onChange={handlePriceChange}
//                           required
//                           placeholder=""
//                         />
//                         <span>Price <span style={{ color: 'red' }}>*</span></span>
//                       </label>
//                       {errors.price && (
//                         <div style={{ color: "red" }}>{errors.price}</div>
//                       )}

//                       <label>
//                         <input
//                           className="tplan-input"
//                           type="number"
//                           value={days}
//                           onChange={handleDaysChange}
//                           placeholder=""
//                           required
//                         />
//                         <span>No of Days <span style={{ color: 'red' }}>*</span></span>
//                       </label>
//                       {errors.days && (
//                         <div style={{ color: "red" }}>{errors.days}</div>
//                       )}

//                     </div>
//                     <div className="tplan-inbetween">
//                       <label>
//                         <input
//                           className="tplan-input"
//                           type="number"
//                           value={GST}
//                           onChange={handleGSTChange}
//                           placeholder=""
//                           required
//                         />
//                         <span>GST <span style={{ color: 'red' }}>*</span></span>
//                       </label>
//                       {errors.gst && (
//                         <div style={{ color: "red" }}>{errors.gst}</div>
//                       )}


// <label>
// <input
//                           className="tplan-input"
//                           type="number"
//                           value={GSTamount}
//                           // onChange={handleGSTChange}
//                           placeholder=""
//                           required
//                         />
//                         <span>GST Amount</span>
//                       </label>

//                     </div>
//                     <label>
// <input
//                           className="tplan-input"
//                           type="number"
//                           value={TotalAmount}
//                           // onChange={handleGSTChange}
//                           placeholder=""
//                           required
//                         />
//                         <span>Total Amount</span>
//                       </label>

//                   </div>
//                 </div>
//                 <button className="submit_tplan" type="submit">
//                   Submit Plan
//                 </button>
//               </form>
//             </div>
//           </div>
//           <div className="tplan-below-table">
//             <h2 className="plan_list_heading">Plans List</h2>
//             <table className="tabp">
//               <thead>
//                 <tr>
//                   <th>Plan Name</th>
//                   <th>UpdatedTime</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.map((plan) => (
//                   <tr key={plan.plan_id}>
//                     <td>{plan.plan_name}</td>
//                     <td>{plan.updatedAt}</td>
//                     <td>{plan.status}</td>
//                     <td>
//                       <button
//                         onClick={() => toggleStatus(plan.plan_id, plan.status)}>
//                         {plan.status === "active"
//                           ? "Set Inactive"
//                           : "Set Active"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {/* Pagination */}
//             <div className="pagination">
//               <button
//                 className="pagenation-btn"
//                 onClick={() => paginate(currentPage - 1)}
//                 disabled={currentPage === 1}>
//                 {"<"} {/* Previous */}
//               </button>
//               <button
//                 className="pagenation-btn"
//                 onClick={() => paginate(currentPage + 1)}
//                 disabled={currentItems.length < itemsPerPage}>
//                 {">"} {/* Next */}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TreatmentPlan;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Plan.css";
import { VINOOTNEW } from "../../Helper/Helper";
import Sidebar from "../../Masterdata/Sidebar/Sidebar";

const TreatmentPlan = () => {
  const [categories, setCategories] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [plan, setPlan] = useState("");
  const [GST, setGST] = useState("");
  const [GSTamount, setGSTamount] = useState("");
  const [TotalAmount, setTotalAmount] = useState("");
  const [days, setDays] = useState("");
  const [price, setPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Change this value as needed
  const [errors, setErrors] = useState({
    plan: "",
    price: "",
    gst: "",
    gstamount: "",
    totalamount: "",
    days: "",
  });
  const navigate = useNavigate();

  // Fetch categories
  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${VINOOTNEW}/api/treatment-category`);
      const activeCategories = response.data.filter(
        (category) => category.status === "active"
      );
      setCategories(activeCategories);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  // Fetch plans
  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${VINOOTNEW}/api/treatment-plan`);
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchPlans();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = plans.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Other event handlers
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handlePlanChange = (e) => {
    const inputValue = e.target.value;
    setPlan(inputValue);
    if (inputValue.length < 15 || inputValue.length > 250) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        plan: "Plan must be between 15 and 250 characters.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, plan: "" }));
    }
  };

  const handleGSTChange = (e) => {
    const inputValue = e.target.value;
    setGST(inputValue);
    const numericRegex = /^[1-9][0-9]?$/; // Updated regex for GST
    if (!numericRegex.test(inputValue)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        gst: "GST must be between 1 and 99.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, gst: "" }));
    }
    calculateGSTAmount(price, inputValue); // Calculate GST amount
  };

  const handleDaysChange = (e) => {
    const inputValue = e.target.value;
    setDays(inputValue); // Fixed issue: setDays instead of setPrice
    const numericRegex = /^[1-9][0-9]{0,2}$/; // Updated regex for days
    if (!numericRegex.test(inputValue)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        days: "Days must be between 1 and 999.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, days: "" }));
    }
  };

  const handlePriceChange = (e) => {
    const inputValue = e.target.value;
    setPrice(inputValue);
    const numericRegex = /^[1-9][0-9]{1,5}$/;
    if (!numericRegex.test(inputValue)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        price: "Price must be between 10 and 999999.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, price: "" }));
    }
    calculateGSTAmount(inputValue, GST); // Calculate GST amount
  };

  // Calculate GST amount based on price and GST percentage
  const calculateGSTAmount = (price, gst) => {
    const gstAmount = (price * gst) / 100;
    setGSTamount(gstAmount);
    setTotalAmount(parseFloat(price) + parseFloat(gstAmount));
  };

  // Submit plan
  const handleSubmitPlan = async (e) => {
    e.preventDefault();
    if (errors.plan || errors.price || errors.days || errors.gst) {
      alert("Please fix the errors before submitting.");
      return;
    }
    try {
      const noOfPlans = await axios.get(`${VINOOTNEW}/api/treatment-plan`);
      const count = noOfPlans.data.length;

      const plan_id = generateUniqueId(count + 0);
      await axios.post(`${VINOOTNEW}/api/treatment-plan`, {
        plan_id: plan_id,
        category_name: selectedCategory,
        plan_name: plan,
        GST: GST,
        GSTamount: GSTamount,
        TotalAmount: TotalAmount,
        price: price,
        days: days,
        updatedAt: new Date().toLocaleString(),
        status: "active",
      });
      alert("plan submittion successfully");
      navigate("/TreatmentCategory");
    } catch (error) {
      console.error(error);
    }
  };

  // Generate unique ID
  const generateUniqueId = (count) => {
    const paddedCount = (count + 1).toString().padStart(3, "0");
    return "PLAN-" + paddedCount;
  };

  // Toggle status
  const toggleStatus = async (plan_id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";

      await axios.put(`${VINOOTNEW}/api/treatment-plan/${plan_id}`, {
        status: newStatus,
        updatedAt: new Date().toLocaleString(), // Updated time
      });

      fetchPlans(); // Refresh the plan list after status change
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  return (
    <div>
      <div className="totalplan">
        <div>
          <Sidebar />
        </div>
        <div className="tplan-above-table1">
          <div className="tplan-above-table">
            <h1>Treatment Plan Master</h1>
            <div>
              <form className="super-regfrom" onSubmit={handleSubmitPlan}>
                <div className="tplan-total">
                  <div className="tplan-flex">
                    <label>
                      <select
                        className="tplan-input"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        placeholder=""
                        required
                      >
                        <option value="">Select </option>
                        {categories.map((item) => (
                          <option key={item._id} value={item.category_name}>
                            {item.category_name}
                          </option>
                        ))}
                      </select>
                      <span>
                        Select Category <span style={{ color: "red" }}>*</span>
                      </span>
                    </label>

                    <label>
                      <input
                        className="tplan-input"
                        type="text"
                        // id="plan"
                        value={plan}
                        onChange={handlePlanChange}
                        placeholder=""
                        required
                      />
                      <span>
                        Treatement Plan <span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                    {errors.plan && (
                      <div style={{ color: "red" }}>{errors.plan}</div>
                    )}

                    <div className="tplan-inbetween">
                      <label>
                        <input
                          className="tplan-input"
                          type="number"
                          value={price}
                          onChange={handlePriceChange}
                          required
                          placeholder=""
                        />
                        <span>
                          Price <span style={{ color: "red" }}>*</span>
                        </span>
                      </label>
                      {errors.price && (
                        <div style={{ color: "red" }}>{errors.price}</div>
                      )}

                      <label>
                        <input
                          className="tplan-input"
                          type="number"
                          value={days}
                          onChange={handleDaysChange}
                          placeholder=""
                          required
                        />
                        <span>
                          No of Days <span style={{ color: "red" }}>*</span>
                        </span>
                      </label>
                      {errors.days && (
                        <div style={{ color: "red" }}>{errors.days}</div>
                      )}
                    </div>
                    <div className="tplan-inbetween">
                      <label>
                        <input
                          className="tplan-input"
                          type="number"
                          value={GST}
                          onChange={handleGSTChange}
                          placeholder=""
                          required
                        />
                        <span>
                          GST <span style={{ color: "red" }}>*</span>
                        </span>
                      </label>
                      {errors.gst && (
                        <div style={{ color: "red" }}>{errors.gst}</div>
                      )}

                      <label>
                        <input
                          className="tplan-input"
                          type="number"
                          value={GSTamount}
                          placeholder=""
                          readOnly
                        />
                        <span>GST Amount</span>
                      </label>
                    </div>
                    <div className="tplan-inbetween">
                      <label>
                        <input
                          className="tplan-input"
                          type="number"
                          value={TotalAmount}
                          placeholder=""
                          readOnly
                        />
                        <span>Total Amount</span>
                      </label>
                    </div>
                  </div>
                </div>
                <button className="submit_tplan" type="submit">
                  Submit Plan
                </button>
              </form>
            </div>
          </div>
          <div className="tplan-below-table">
            <h2 className="plan_list_heading">Plans List</h2>
            <table className="tabp">
              <thead>
                <tr>
                  <th>Plan Name</th>
                  <th>UpdatedTime</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((plan) => (
                  <tr key={plan.plan_id}>
                    <td>{plan.plan_name}</td>
                    <td>{plan.updatedAt}</td>
                    <td>{plan.status}</td>
                    <td>
                      <button
                        onClick={() =>
                          toggleStatus(plan.plan_id, plan.status)
                        }
                      >
                        {plan.status === "active"
                          ? "Set Inactive"
                          : "Set Active"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
              <button
                className="pagenation-btn"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {"<"} {/* Previous */}
              </button>
              <button
                className="pagenation-btn"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentItems.length < itemsPerPage}
              >
                {">"} {/* Next */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlan;
