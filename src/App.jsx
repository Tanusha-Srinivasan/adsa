import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import MapComponent from "./components/MapComponent";
import DepotInput from "./components/DepotInput";
import DeliveryPointsInput from "./components/DeliveryPointsInput";
import OptimalRoutePage from "./components/OptimalRoutePage";

const App = () => {
  const [depot, setDepot] = useState(null);
  const [deliveryPoints, setDeliveryPoints] = useState([]);

  const handleMapClick = (latlng) => {
    if (!depot) {
      setDepot(latlng); // Set depot if not already set
    } else {
      setDeliveryPoints([...deliveryPoints, latlng]); // Add delivery point
    }
  };

  return (
    <Router>
      <div className="flex flex-col items-center bg-gray-100 min-h-screen">
        {/* Header */}
        <header className="w-full bg-blue-500 text-white py-4 shadow-md">
          <nav className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-xl font-bold">Route Planner</h1>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/map"
            element={
              <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-[90vw] h-[85vh]">
                <div className="flex flex-col lg:flex-row gap-6 h-full">
                  {/* Map Section */}
                  <div className="flex-1 h-full">
                    <MapComponent
                      depot={depot}
                      deliveryPoints={deliveryPoints}
                      onMapClick={handleMapClick}
                    />
                  </div>

                  {/* Input Section */}
                  <div className="flex flex-col w-full lg:w-[30%] space-y-6">
                    <DepotInput depot={depot} setDepot={setDepot} />
                    <DeliveryPointsInput
                      deliveryPoints={deliveryPoints}
                      setDeliveryPoints={setDeliveryPoints}
                    />
                    {/* Calculate Optimal Route Button */}
                    <button
                      onClick={() =>
                        window.location.href = "/optimal-route"
                      }
                      className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600"
                    >
                      Calculate Optimal Route
                    </button>
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path="/optimal-route"
            element={
              <OptimalRoutePage depot={depot} deliveryPoints={deliveryPoints} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;