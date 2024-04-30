// import React, { useState, useEffect } from "react";
// import axios from "axios"; // Import Axios
// import Cities from "../Citymaster/City";
// import { useNavigate } from "react-router-dom";
// import { VINOOTNEW } from "../../Helper/Helper";

// const Area = () => {
//   const [CityName, setCityName] = useState("");
//   const [cityId, setCityId] = useState("");
//   const [areaName, setAreaName] = useState("");
//   const [cities, setCities] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch states data when component mounts
//     const fetchCities = async () => {
//       try {
//         const response = await axios.get(`${VINOOTNEW}/api/cities`);
//         setCities(response.data);
//       } catch (error) {
//         console.error("Failed to fetch cities", error);
//       }
//     };
//     fetchCities();
//   }, []);

//   const handleStateChange = (e) => {
//     const selectedState = cities.find((city) => city.name === e.target.value);
//     if (selectedState) {
//       setCityName(selectedState.name);
//       setCityId(selectedState._id);
//       setCityId(selectedState.city_id);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const selectedCity = cities.find((city) => city.name === CityName);
//       const existingAreas = await axios.get(`${VINOOTNEW}/api/areas`);
//       const count = existingAreas.data.length;
//       // Generate unique ID
//       const area_id = generateUniqueId(areaName, count + 0);
//       const response = await axios.post(`${VINOOTNEW}/api/area`, {
//         cityId: selectedCity._id,
//         areaName: areaName,
//         city_id: selectedCity.city_id, // Include city_id in the request body
//         area_id: area_id,
//       });

//       if (response.status === 201) {
//         console.log("City added successfully");
//         alert("area added successfully");
//         navigate("/");
//       } else {
//         console.error("Failed to add city");
//       }
//     } catch (error) {
//       console.error("Failed to add city", error);
//       if (error.response && error.response.status === 400) {
//         // If the state already exists, show an alert to the user
//         alert("Area already exists in this city");
//       }
//     }
//   };
//   const generateUniqueId = (name, count) => {
//     const abbreviation = name.substring(0, 3).toUpperCase(); // Get first three letters and convert to uppercase
//     const paddedCount = (count + 1).toString().padStart(3, "0"); // Increment count and pad with zeros
//     const id = abbreviation + paddedCount; // Generate unique ID
//     return id;
//   };

//   return (
//     <div className="App">
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>
//             Select City:
//             <select value={CityName} onChange={handleStateChange}>
//               <option value="">Select a city</option>
//               {cities.map((city) => (
//                 <option key={city._id} value={city.name}>
//                   {city.name}
//                 </option>
//               ))}
//             </select>
//           </label>
//         </div>
//         <div>
//           <label>
//             Area Name:
//             <input
//               type="text"
//               value={areaName}
//               onChange={(e) => setAreaName(e.target.value)}
//             />
//           </label>
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default Area;


import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import Cities from "../Citymaster/City";
import { useNavigate } from "react-router-dom";
import { VINOOTNEW } from "../../Helper/Helper";
import Sidebar from "../Sidebar/Sidebar";

const Area = () => {
  const [CityName, setCityName] = useState("");
  const [cityId, setCityId] = useState("");
  const [areaName, setAreaName] = useState("");
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCities();
    fetchAreas();
  }, []);
  const fetchAreas = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${VINOOTNEW}/api/areas`);
      setAreas(response.data);
    } catch (error) {
      console.error("Failed to fetch areas", error);
    } finally {
      setIsLoading(false);
    }
  };
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${VINOOTNEW}/api/cities`);
        setCities(response.data);
      } catch (error) {
        console.error("Failed to fetch cities", error);
      }
    };

  const handleStateChange = (e) => {
    const selectedState = cities.find((city) => city.name === e.target.value);
    if (selectedState) {
      setCityName(selectedState.name);
      setCityId(selectedState._id);
      setCityId(selectedState.city_id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedCity = cities.find((city) => city.name === CityName);
      if (!selectedCity) {
        console.error("Selected state not found");
        return;
      }
      // Generate unique ID
      const existingAreas = await axios.get(`${VINOOTNEW}/api/areas`);
      const count = existingAreas.data.length;
      const area_id = generateUniqueId(areaName, count + 0);

      const response = await axios.post(`${VINOOTNEW}/api/areas`, {
        cityId: selectedCity._id,
        areaName: areaName,
        city_id: selectedCity.city_id,
        area_id: area_id,
      });

      if (response.status === 201) {
        console.log("Area added successfully");
        alert("Area added successfully");
        navigate("/");
      } else {
        console.error("Failed to add area");
      }
    } catch (error) {
      console.error("Failed to add area", error);
      if (error.response && error.response.status === 400) {
        alert("Area already exists in this city");
      }
    }
  };

  const toggleStatus = async (areaId, currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";

      const response = await axios.post(
        // Update to POST method
       ` ${VINOOTNEW}/api/areas/${areaId}/toggle`, // Update the route
        {
        status: newStatus,
        }
      );

      if (response.status === 200) {
        console.log("Area status updated successfully");
        fetchAreas();
      } else {
        console.error("Failed to toggle area status");
      }
    } catch (error) {
      console.error("Failed to toggle area status", error);
      alert("Failed to toggle area status");
    }
  };

  const generateUniqueId = (name, count) => {
    const abbreviation = name.substring(0, 3).toUpperCase(); // Get first three letters and convert to uppercase
    const paddedCount = (count + 1).toString().padStart(3, "0"); // Increment count and pad with zeros
    const id = abbreviation + paddedCount; // Generate unique ID
    return id;
  };

  return (
<<<<<<< HEAD
    <div style={{display:'flex'}}>
      <div><Sidebar/></div>
      <div className="App">
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Select City:
              <select value={CityName} onChange={handleStateChange}>
                <option value="">Select a city</option>
                {cities.map((city) => (
                  <option key={city._id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Area Name:
              <input
                type="text"
                value={areaName}
                onChange={(e) => setAreaName(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
=======
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Select City:
            <select value={CityName} onChange={handleStateChange}>
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city._id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Area Name:
            <input
              type="text"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        {isLoading ? (
          <p>Loading cities...</p>
        ) : (
      <table className="table">
        <thead>
          <tr>
            <th>Area Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {areas.map((area) => (
            <tr key={area._id}>
              <td>{area.name}</td>
                  {/* Assuming status field exists in the Area schema */}
              <td>{area.status}</td>
              <td>
                <button onClick={() => toggleStatus(area._id, area.status)}>
                      {area.status === "active" ? "Inactive" : "Active"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        )}
>>>>>>> c3db5cd260a7b083f1507c044753c547ba60eac3
      </div>
    </div>
  );
};

export default Area;
