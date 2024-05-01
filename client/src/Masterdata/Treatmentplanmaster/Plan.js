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
  const [days, setDays] = useState("");
  const [price, setPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); // Change this value as needed
  const navigate = useNavigate();

  // Fetch categories
  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${VINOOTNEW}/api/treatment-category`);
      const activeCategories = response.data.filter((category) => category.status === "active");
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
  const handlePlanChange = (e) => setPlan(e.target.value);
  const handleGSTChange = (e) => setGST(e.target.value);
  const handleDaysChange = (e) => setDays(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);

  // Submit plan
  const handleSubmitPlan = async (e) => {
    e.preventDefault();
    try {
      const noOfPlans = await axios.get(`${VINOOTNEW}/api/treatment-plan`);
      const count = noOfPlans.data.length;

      const plan_id = generateUniqueId(count + 0);
      await axios.post(`${VINOOTNEW}/api/treatment-plan`, {
        plan_id: plan_id,
        category_name: selectedCategory,
        plan_name: plan,
        GST: GST,
        price: price,
        days: days,
        updatedAt: new Date().toLocaleString(),
        status: "active",
      });
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















  const [formData, setFormData] = useState({
    fullName: "",
    userId: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    gender: "",
    userType: "SuperAdmin",
    activeChangedBy: "none",
    // createdBy: createdby,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5001/api/register",
        formData
      );
      console.log("User registered:", res.data);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
    }
  };

  return (
    <div>
      <div className="totalplan">
        <div>
          <Sidebar />
        </div>
        <div  className="tplan-above-table1">
          <div className="tplan-above-table">
            <h1>Treatment Plan Master</h1>
            <div>
              <form className="super-regfrom" onSubmit={handleSubmitPlan}>
                <div className="tplan-total" >
                  <div className="tplan-flex">
                    <label>
                      <select
                        className='tplan-input'
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
                      <span>Select Category</span>
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
                      <span>Treatement Plan</span>
                    </label>

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
                        <span>GST</span>
                      </label>

                      <label>
                        <input
                          className="tplan-input"
                          type="number"
                          value={days}
                          onChange={handleDaysChange}
                          placeholder=""
                          required
                        />
                        <span>No of Days</span>
                      </label>
                    </div>

                    <label>
                      <input
                        className="tplan-input"
                        type="number"
                        value={price}
                        onChange={handlePriceChange}
                        required
                        placeholder=""

                      />
                      <span>Price</span>
                    </label>
                  </div>

                </div>
                <button className="submit_tplan" type="submit">Submit Plan</button>
              </form>
            </div>
          </div>
          <div  className="tplan-below-table">
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
                      <button onClick={() => toggleStatus(plan.plan_id, plan.status)}>
                        {plan.status === "active" ? "Set Inactive" : "Set Active"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
              <button className="pagenation-btn" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                {"<"} {/* Previous */}
              </button>
              <button className="pagenation-btn" onClick={() => paginate(currentPage + 1)} disabled={currentItems.length < itemsPerPage}>
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