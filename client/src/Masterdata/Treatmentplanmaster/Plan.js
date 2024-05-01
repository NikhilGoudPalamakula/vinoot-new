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
      const response = await axios.get(`${ VINOOTNEW }/api/treatment-category`);
      const activeCategories = response.data.filter((category) => category.status === "active");
      setCategories(activeCategories);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  // Fetch plans
  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${ VINOOTNEW }/api/treatment-plan`);
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
      const noOfPlans = await axios.get(`${ VINOOTNEW }/api/treatment-plan`);
      const count = noOfPlans.data.length;

      const plan_id = generateUniqueId(count + 0);
      await axios.post(`${ VINOOTNEW }/api/treatment-plan`, {
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

      await axios.put(`${ VINOOTNEW }/api/treatment-plan/${plan_id}`, {
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
      <div className="totalplan" style={{ display: "flex" }}>
        <div>
          <Sidebar />
        </div>
        <div style={{ marginLeft: "30%" }}>
          <h1>Treatment Plan Master</h1>
          <form action="" onSubmit={handleSubmitPlan} className="form23">
            <div>
              <label>Select Category:</label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="select"
                required
              >
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
            <div class="inline-fields">
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
                <label>No of days:</label>
                <input
                  type="number"
                  value={days}
                  onChange={handleDaysChange}
                  required
                />
              </div>
            </div>
            <div>
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

          {/* Plans List */}
          <h2>Plans List</h2>
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
  );
};

export default TreatmentPlan;