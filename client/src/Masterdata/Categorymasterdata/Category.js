// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { VINOOTNEW } from "../../Helper/Helper";
// import "./Category.css";
// import Sidebar from "../../Masterdata/Sidebar/Sidebar";

// const TreatmentCategory = () => {
//   const navigate = useNavigate();

//   const [value, setValue] = useState("");
//   const [categories, setCategories] = useState([]);
//   const presentTime = new Date().toLocaleString();

//   // Function to fetch existing categories
//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(
//         `${VINOOTNEW}/api/treatment-category`
//       );
//       setCategories(response.data); // Assuming the response contains an array of categories
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCategories(); // Fetch categories when the component mounts
//   }, []); // Empty dependency array ensures this effect runs once on mount

//   const handleSelect = (event) => {
//     setValue(event.target.value);
//   };

//   // Function to handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const noOfCategories = await axios.get(
//         `${VINOOTNEW}/api/treatment-category`
//       );
//       const count = noOfCategories.data.length;

//       const category_id = generateUniqueId(value, count + 1);

//       await axios.post(`${VINOOTNEW}/api/treatment-category`, {
//         category_id: category_id,
//         category_name: value,
//         updatedTime: presentTime,
//         status: "active", // Default status is active
//       });

//       setValue("");
//       alert("Success");
//       navigate("/TreatmentPlan");
//       fetchCategories(); // Refresh the category list
//     } catch (error) {
//       console.error("Error saving option:", error);
//     }
//   };

//   // Function to generate unique ID
//   const generateUniqueId = (name, count) => {
//     const abbreviation = name.substring(0, 3).toUpperCase();
//     const paddedCount = (count + 1).toString().padStart(3, "0");
//     const id = "CAT-" + abbreviation + "-" + paddedCount;
//     return id;
//   };

//   // Function to toggle status and update the category
//   const toggleStatus = async (category_id, currentStatus) => {
//     try {
//       const newStatus = currentStatus === "active" ? "inactive" : "active";

//       await axios.put(
//         `${VINOOTNEW}/api/treatment-category/${category_id}`,
//         {
//           status: newStatus,
//           updatedTime: presentTime, // Updated time
//         }
//       );

//       fetchCategories(); // Refresh the category list after status change
//     } catch (error) {
//       console.error("Error toggling status:", error);
//     }
//   };

//   return (
//     <div className="total-tcategory" >
//     <div>
//       <Sidebar/>
//     </div>
//     <div className="treat-cat-right" >
//       <h1  className="h1111">Treatment Category Master</h1>
//       <form action="" onSubmit={handleSubmit} className="cat-form">
//         <label htmlFor="tar">Category</label>
//         <input
//           type="text"
//           id="tar"
//           value={value}
//           onChange={handleSelect}
//           required
//         />
//         <br />
//         <button className="category_submit-btn">Submit</button>
//       </form>

//       <h2 className="category_list_heading">Categories List</h2>
//       <table className="tabc">
//         <thead>
//           <tr>
//             <th>Category Name</th>
//             <th>UpdatedTime</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {categories.map((category) => (
//             <tr key={category.category_id}>
//               <td>{category.category_name}</td>
//               <td>{category.time}</td>
//               <td>{category.status}</td>
//               <td>
//                 <button className="treatcat-btn"
//                   onClick={() =>
//                     toggleStatus(category.category_id, category.status)
//                   }>
//                   {category.status === "active" ? "Set Inactive" : "Set Active"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </div>
//   );
// };

// export default TreatmentCategory;





import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VINOOTNEW } from "../../Helper/Helper";
import "./Category.css";
import Sidebar from "../../Masterdata/Sidebar/Sidebar";

const TreatmentCategory = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [categories, setCategories] = useState([]);
  const presentTime = new Date().toLocaleString();
  const [error, setError] = useState("");

  // Function to fetch existing categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${VINOOTNEW}/api/treatment-category`);
      setCategories(response.data); // Assuming the response contains an array of categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories when the component mounts
  }, []); // Empty dependency array ensures this effect runs once on mount

  const handleSelect = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    if (inputValue.length < 4 || inputValue.length > 100) {
      setError("Text length must be between 4 and 100 characters.");
    } else {
      setError("");
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      alert("Please fix the error before submitting.");
      return;
    }

    try {
      const noOfCategories = await axios.get(
       ` ${VINOOTNEW}/api/treatment-category`
      );
      const count = noOfCategories.data.length;

      const category_id = generateUniqueId(value, count + 1);

      await axios.post(`${VINOOTNEW}/api/treatment-category`, {
        category_id: category_id,
        category_name: value,
        updatedTime: presentTime,
        status: "active", // Default status is active
      });

      setValue("");
      alert("Success");
      navigate("/TreatmentPlan");
      fetchCategories(); // Refresh the category list
    } catch (error) {
      console.error("Error saving option:", error);
    }
  };

  // Function to generate unique ID
  const generateUniqueId = (name, count) => {
    const abbreviation = name.substring(0, 3).toUpperCase();
    const paddedCount = (count + 1).toString().padStart(3, "0");
    const id = "CAT-" + abbreviation + "-" + paddedCount;
    return id;
  };

  // Function to toggle status and update the category
  const toggleStatus = async (category_id, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";

      await axios.put(`${VINOOTNEW}/api/treatment-category/${category_id}`, {
        status: newStatus,
        updatedTime: presentTime, // Updated time
      });

      fetchCategories(); // Refresh the category list after status change
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  return (
    <div className="total-tcategory">
      <div>
        <Sidebar />
      </div>
      <div className="treat-cat-right">
        <h1 className="h1111">Treatment Category Master</h1>
        <form action="" onSubmit={handleSubmit} className="cat-form">
          <label htmlFor="tar">Category</label>
          <input
            type="text"
            id="tar"
            value={value}
            onChange={handleSelect}
            required
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <br />
          <button className="category_submit-btn">Submit</button>
        </form>

        <h2 className="category_list_heading">Categories List</h2>
        <table className="tab-cat">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>UpdatedTime</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.category_id}>
                <td>{category.category_name}</td>
                <td>{category.time}</td>
                <td>{category.status}</td>
                <td>
                  <button
                    className="treatcat-btn"
                    onClick={() =>
                      toggleStatus(category.category_id, category.status)
                    }>
                    {category.status === "active"
                      ? "Set Inactive"
                      : "Set Active"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TreatmentCategory;