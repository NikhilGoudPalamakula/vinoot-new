import React, { useState, useEffect } from "react";
import axios from "axios";
import './Franchisestaffdetails.css'
const Franchisestaffdetails = () => {
    const [admins, setAdmins] = useState([]);

    const fetchAdmins = async () => {
        try {
            const frid = localStorage.getItem("FranchiseID");
            if (frid) {
                const response = await axios.get(`http://localhost:5001/api/franchisefetchusers/${frid}`);
                setAdmins(response.data);
            } else {
                console.error("FranchiseID not found in localStorage");
            }
        } catch (error) {
            console.error("Error fetching admins:", error);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);


    const toggleActiveState = async (id, isActive) => {
        try {
            const updatedBy = localStorage.getItem("username"); // Get username from localStorage
            await axios.patch(
                `http://localhost:5001/api/franchisestateupdate/${id}`,
                { isActive: !isActive, updatedBy }
            );
            // Refresh user list after updating active state
            fetchAdmins();
        } catch (error) {
            console.error("Error updating active state:", error);
        }
    };

    return (
        <div>
            <div  className="franchisestaffdetail">
                {/* <h1>Franchise Staff Details</h1> */}
                <table>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>User ID</th>
                            <th>Franchise Name</th>
                            <th>Franchise ID</th>
                            <th>Designation</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Active/Inactive</th>
                            <th>Modified By</th>
                <th>Modified At</th>
                <th>Created At</th>
                <th>Created By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map(admin => (
                            <tr key={admin._id}>
                                <td>{admin.fullname}</td>
                                <td>{admin.userId}</td>
                                <td>{admin.franchisename}</td>
                                <td>{admin.FranchiseID}</td>
                                <td>{admin.designation}</td>
                                <td>{admin.email}</td>
                                <td>{admin.password}</td>
                                <td> <button
                                    onClick={() =>
                                        toggleActiveState(admin._id, admin.isActive)
                                    }
                                >
                                    {admin.isActive ? "Deactivate" : "Activate"}
                                </button></td>
                                <td>{admin.modifiedBy}</td>
                                <td>{admin.modifiedAt}</td>
                                <td>{admin.createdAt}</td>
                                <td>{admin.createdBy}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Franchisestaffdetails;
