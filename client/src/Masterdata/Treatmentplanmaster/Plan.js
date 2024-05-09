import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the default styles for React Toastify
import "./Plan.css";
import { VINOOTNEW } from "../../Helper/Helper";
import Sidebar from "../../Masterdata/Sidebar/Sidebar";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

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
  const [itemsPerPage] = useState(3);
  const [errors, setErrors] = useState({
    plan: "",
    price: "",
    gst: "",
    // gstamount: "",
    // totalamount: "",
    days: "",
  });
  const [editId, setEditId] = useState(""); // Category ID being edited
  const presentTime = new Date().toLocaleString();
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
    if (errors.plan || errors.price || errors.days || errors.GST) {
      toast.error("Please fix the errors before submitting", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
    // Check if the plan name already exists
    const isPlanExist = plans.some(
      (plana) =>
        plana.plan_name.toLowerCase() === plan.toLowerCase() &&
        plana.plan_id !== editId // Compare with other plan IDs except the one being edited
    );

    if (isPlanExist) {
      toast.error("plan already exists. Please enter a unique plan name.", {
        position: "top-right",
        autoClose: 2500,
      });
      return;
    }
    try {
      const noOfPlans = await axios.get(`${VINOOTNEW}/api/treatment-plan`);
      const count = noOfPlans.data.length;

      const plan_id = generateUniqueId(count + 0);
      if (editId) {
        await axios.put(`${VINOOTNEW}/api/treatment-plan/${editId}`, {
          plan_name: plan,
          GST: GST,
          GSTamount: GSTamount,
          TotalAmount: TotalAmount,
          price: price,
          days: days,
          updatedAt: presentTime,
        });
      } else {
        await axios.post(`${VINOOTNEW}/api/treatment-plan`, {
          plan_id: plan_id,
          category_name: selectedCategory,
          plan_name: plan,
          GST: GST,
          GSTamount: GSTamount,
          TotalAmount: TotalAmount,
          price: price,
          days: days,
          updatedAt: presentTime,
          status: "active",
        });
      }
      toast.success("Plan Added Successful", {
        position: "top-right",
        autoClose: 1500,
        onClose: () => {
          navigate("/TreatmentCategory");
        },
      });
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
        updatedAt: presentTime, // Updated time
      });

      fetchPlans(); // Refresh the plan list after status change
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };
  // Function to handle category editing
  const handleEdit = (
    plan_id,
    plan_name,
    GST,
    days,
    price,
    GSTamount,
    TotalAmount,
    category_name
  ) => {
    setEditId(plan_id);
    setPlan(plan_name);
    setPrice(price);
    setGST(GST);
    setDays(days);
    setGSTamount(GSTamount);
    setTotalAmount(TotalAmount);
    setSelectedCategory(category_name);
  };
  // Function to cancel category editing
  const handleCancelEdit = () => {
    setEditId("");
    setPlan("");
    setPrice("");
    setGST("");
    setDays("");
    setGSTamount("");
    setTotalAmount("");
    setSelectedCategory("");
  };

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current plans
  const indexOfLastPlan = currentPage * itemsPerPage;
  const indexOfFirstPlan = indexOfLastPlan - itemsPerPage;
  const currentPlans = plans.slice(indexOfFirstPlan, indexOfLastPlan);

  // Calculate total pages
  const totalPages = Math.ceil(plans.length / itemsPerPage);

  return (
    <div>
      <div className="totalplan">
        <ToastContainer />
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
                        required>
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
                {/* <button className="submit_tplan" type="submit">
                  Submit Plan
                </button> */}
                {editId ? (
                  <div>
                    <button className="plan_save-btn" type="submit">
                      Save
                    </button>
                    <button
                      className="plan_cancel-btn"
                      type="button"
                      onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button className="submit_tplan" type="submit">
                    Submit
                  </button>
                )}
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
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {currentPlans.map((plan) => (
                  <tr key={plan.plan_id}>
                    <td>{plan.plan_name}</td>
                    <td>{plan.updatedAt}</td>
                    <td>{plan.status}</td>
                    <td>
                      <button
                        onClick={() => toggleStatus(plan.plan_id, plan.status)}>
                        {plan.status === "active"
                          ? "Set Inactive"
                          : "Set Active"}
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          handleEdit(
                            plan.plan_id,
                            plan.plan_name,
                            plan.GST,
                            plan.days,
                            plan.price,
                            plan.GSTamount,
                            plan.TotalAmount,
                            plan.category_name
                          )
                        }>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="paginationss">
              <span onClick={() => handlePageChange(1)}>
                <KeyboardDoubleArrowLeftIcon />
              </span>
              <span onClick={() => handlePageChange(currentPage - 1)}>
                <KeyboardArrowLeftIcon />
              </span>
              {[...Array(totalPages)].map((_, index) => (
                <span
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={
                    currentPage === index + 1 ? "pageactive-page" : ""
                  }>
                  {index + 1}
                </span>
              ))}
              <span onClick={() => handlePageChange(currentPage + 1)}>
                <KeyboardArrowRightIcon />
              </span>
              <span onClick={() => handlePageChange(totalPages)}>
                <KeyboardDoubleArrowRightIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentPlan;
