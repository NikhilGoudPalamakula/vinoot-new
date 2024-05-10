import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the default styles for React Toastify
import { useNavigate } from "react-router-dom";
import { VINOOTNEW } from "../../Helper/Helper";
import "./Category.css";
import Sidebar from "../../Masterdata/Sidebar/Sidebar";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const TreatmentCategory = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(2); // Number of categories per page
  const presentTime = new Date().toLocaleString();
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(""); // Category ID being edited
  const userId = localStorage.getItem("userId");

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
    const trimmedValue = inputValue.trim(); // Trim the input value
    setValue(trimmedValue); // Set the original input value
    if (inputValue.length < 3 || inputValue.length > 100) {
      setError("Text length must be between 3 and 100 characters.");
    } else {
      setError("");
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      toast.error("Please fix the errors before submitting", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
    // Check if the category name already exists
    const isCategoryExist = categories.some(
      (category) => category.category_name.toLowerCase() === value.toLowerCase()
    );

    if (isCategoryExist) {
      toast.error(
        "Category already exists. Please enter a unique category name.",
        {
          position: "top-right",
          autoClose: 2500,
        }
      );
      return;
    }
    try {
      const noOfCategories = await axios.get(
        `${VINOOTNEW}/api/treatment-category`
      );
      const count = noOfCategories.data.length;

      const category_id = generateUniqueId(value, count + 1);
      if (editId) {
        await axios.put(`${VINOOTNEW}/api/treatment-category/${editId}`, {
          // category_id: category_id,
          category_name: value,
          modifiedAt: presentTime,
          modifiedBy: userId,
          // status: "active", // Default status is active
        });
      } else {
        await axios.post(`${VINOOTNEW}/api/treatment-category`, {
          category_id: category_id,
          category_name: value,
          createdAt: presentTime,
          status: "active", // Default status is active
          createdBy: userId, // Set createdBy field

          modifiedBy: userId, // Set modifiedBy field
          modifiedAt: presentTime, // Set modifiedAt field
        });
      }

      setValue("");
      setEditId("");
      toast.success("Category Added Successful", {
        position: "top-right",
        autoClose: 1500,
        onClose: () => {
          navigate("/TreatmentPlan");
        },
      });
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
        modifiedAt: presentTime, // Updated time
        modifiedBy: userId, // Set modifiedBy field
      });

      fetchCategories(); // Refresh the category list after status change
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };
  // Function to handle category editing
  const handleEdit = (category_id, category_name) => {
    setEditId(category_id);
    setValue(category_name);
  };
  // Function to cancel category editing
  const handleCancelEdit = () => {
    setEditId("");
    setValue("");
  };

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current categories
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  // Calculate total pages
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  return (
    <div className="total-tcategory">
      <ToastContainer />{" "}
      <div>
        <Sidebar />
      </div>
      <div className="treat-cat-right">
        <h1 className="h1111">Treatment Category Master</h1>
        <form action="" onSubmit={handleSubmit} className="cat-form">
          <label htmlFor="tar">
            Category <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="tar"
            value={value}
            onChange={handleSelect}
            required
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <br />
          {editId ? (
            <div>
              <button className="category_save-btn" type="submit">
                Save
              </button>
              <button
                className="category_cancel-btn"
                type="button"
                onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="category_submit-btn" type="submit">
              Submit
            </button>
          )}
        </form>

        <h2 className="category_list_heading">Categories List</h2>
        <table className="tab-cat">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>UpdatedTime</th>
              <th>Status</th>
              <th>Action</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map((category) => (
              <tr key={category.category_id}>
                <td>{category.category_name}</td>
                <td>{category.modifiedAt}</td>
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
                <td>
                  <button
                    className="treatcat-btn"
                    onClick={() =>
                      handleEdit(category.category_id, category.category_name)
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
              className={currentPage === index + 1 ? "pageactive-page" : ""}>
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
  );
};

export default TreatmentCategory;
