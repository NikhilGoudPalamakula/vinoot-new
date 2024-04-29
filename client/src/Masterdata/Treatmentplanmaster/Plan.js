// // App.js

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { VINOOTNEW } from "../../Helper/Helper";

// const TreatmentPlan = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [plan, setPlan] = useState("");
//   const [GST, setGST] = useState("");
//   const [days, setDays] = useState("");
//   const [price, setPrice] = useState("");
//   const presentTime = new Date().toLocaleString();
//   const navigate = useNavigate();

//   const fetchCategory = async () => {
//     try {
//       const response = await axios.get(
//         `${VINOOTNEW}/api/treatment-category`
//       );
//       setCategories(response.data);
//     } catch (error) {
//       console.error("Error fetching category:", error);
//     }
//   };

//   // Fetch the category when the component is mounted
//   useEffect(() => {
//     fetchCategory();
//   }, []);

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//   };

//   const handlePlanChange = (e) => {
//     setPlan(e.target.value);
//   };
//   const handleGSTChange = (e) => {
//     setGST(e.target.value);
//   };
//   const handleDaysChange = (e) => {
//     setDays(e.target.value);
//   };

//   const handlePriceChange = (e) => {
//     setPrice(e.target.value);
//   };

//   const handleSubmitPlan = async (e) => {
//     e.preventDefault();
//     try {
//       const noOfPlans = await axios.get(
//         `${VINOOTNEW}/api/treatment-plan`
//       );
//       const count = noOfPlans.data.length;

//       // Generate unique ID
//       const plan_id = generateUniqueId(count + 0);
//       // setDate(presentTime);
//       await axios.post(`${VINOOTNEW}/api/treatment-plan`, {
//         plan_id: plan_id,
//         category_name: selectedCategory,
//         plan_name: plan,
//         GST: GST,
//         price: price,
//         days: days,
//         updatedAt: presentTime,
//       });
//       navigate("/TreatmentCategory");
//       // console.log(planDetails);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const generateUniqueId = (count) => {
//     const paddedCount = (count + 1).toString().padStart(3, "0"); // Increment count and pad with zeros
//     const id = "PLAN-" + paddedCount; // Generate unique ID
//     return id;
//   };

//   return (
//     <div>
//       <h1>Treatment Plan Master</h1>
//       <form action="" onSubmit={handleSubmitPlan}>
//         <div>
//           <label>Select Category:</label>
//           <select
//             value={selectedCategory}
//             onChange={handleCategoryChange}
//             required>
//             <option value="">Select </option>
//             {categories.map((item) => (
//               <option key={item._id} value={item.category_name}>
//                 {item.category_name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label htmlFor="plan">treatment plan:</label>
//           <input
//             type="text"
//             id="plan"
//             value={plan}
//             onChange={handlePlanChange}
//             required
//           />
//         </div>
//         <div>
//           <label>GST:</label>
//           <input
//             type="number"
//             value={GST}
//             onChange={handleGSTChange}
//             required
//           />
//         </div>
//         <div>
//           <div>
//             <label>No of days:</label>
//             <input
//               type="number"
//               value={days}
//               onChange={handleDaysChange}
//               required
//             />
//           </div>
//           <div></div>
//           <label>Price:</label>
//           <input
//             type="number"
//             value={price}
//             onChange={handlePriceChange}
//             required
//           />
//         </div>
//         <button>Submit Plan</button>
//       </form>
//     </div>
//   );
// };

// export default TreatmentPlan;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Plan.css";
import { VINOOTNEW } from "../../Helper/Helper";
const TreatmentPlan = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [plan, setPlan] = useState("");
  const [GST, setGST] = useState("");
  const [days, setDays] = useState("");
  const [price, setPrice] = useState("");
  const presentTime = new Date().toLocaleString();
  const navigate = useNavigate();

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `${VINOOTNEW}/api/treatment-category`
      );
      // Filter only active categories
      const activeCategories = response.data.filter(
        (category) => category.status === "active"
      );

      setCategories(activeCategories); // Update state with active categories
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  // Fetch the category when the component is mounted
  useEffect(() => {
    fetchCategory();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePlanChange = (e) => {
    setPlan(e.target.value);
  };
  const handleGSTChange = (e) => {
    setGST(e.target.value);
  };
  const handleDaysChange = (e) => {
    setDays(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmitPlan = async (e) => {
    e.preventDefault();
    try {
      const noOfPlans = await axios.get(
        `${VINOOTNEW}/api/treatment-plan`
      );
      const count = noOfPlans.data.length;

      // Generate unique ID
      const plan_id = generateUniqueId(count + 0);
      // setDate(presentTime);
      await axios.post(`${VINOOTNEW}/api/treatment-plan`, {
        plan_id: plan_id,
        category_name: selectedCategory,
        plan_name: plan,
        GST: GST,
        price: price,
        days: days,
        updatedAt: presentTime,
      });
      navigate("/TreatmentCategory");
      // console.log(planDetails);
    } catch (error) {
      console.error(error);
    }
  };
  const generateUniqueId = (count) => {
    const paddedCount = (count + 1).toString().padStart(3, "0"); // Increment count and pad with zeros
    const id = "PLAN-" + paddedCount; // Generate unique ID
    return id;
  };

  return (
    <div>
      <h1>Treatment Plan Master</h1>
      <form action="" onSubmit={handleSubmitPlan} className="form">
        <div>
          <label>Select Category:</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="select"
            required>
            <option value="">Select </option>
            {categories.map((item) => (
              <option key={item._id} value={item.category_name}>
                {item.category_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="plan">treatment plan:</label>
          <input
            type="text"
            id="plan"
            value={plan}
            onChange={handlePlanChange}
            required
          />
        </div>
        <div>
          <label>GST:</label>
          <input
            type="number"
            value={GST}
            onChange={handleGSTChange}
            required
          />
        </div>
        <div>
          <div>
            <label>No of days:</label>
            <input
              type="number"
              value={days}
              onChange={handleDaysChange}
              required
            />
          </div>
          <div></div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>
        <button>Submit Plan</button>
      </form>
    </div>
  );
};

export default TreatmentPlan;