import React from "react";
import { useNavigate } from "react-router-dom";

const DeliveryPointsInput = ({ deliveryPoints, setDeliveryPoints, depot }) => {
  const navigate = useNavigate();

  const handleRemovePoint = (indexToRemove) => {
    const updatedPoints = deliveryPoints.filter((_, index) => index !== indexToRemove);
    setDeliveryPoints(updatedPoints); // Update the delivery points
  };

  const handleCalculateRoute = () => {
    console.log("Depot:", depot); // Debugging
    console.log("Delivery Points:", deliveryPoints); // Debugging

    if (!depot || !depot.lat || !depot.lng) {
      alert("Please select a depot before calculating the route.");
      return;
    }
    if (deliveryPoints.length === 0) {
      alert("Please add at least one delivery point before calculating the route.");
      return;
    }

    // Navigate to the Optimal Route Page and pass data via state
    navigate("/optimal-route", {
      state: { depot, deliveryPoints },
    });
  };

  return (
    <div className="mb-6 p-4 bg-white shadow-md rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Points</h3>
      {deliveryPoints.length > 0 ? (
        <div className="space-y-4">
          {deliveryPoints.map((point, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 shadow-sm rounded-md border border-gray-300 flex justify-between items-center"
            >
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Latitude:</span> {point.lat}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Longitude:</span> {point.lng}
                </p>
              </div>
              <button
                onClick={() => handleRemovePoint(index)}
                className="text-red-500 font-bold text-lg px-2 hover:text-red-700"
              >
                -
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600">Click on the map to add delivery points.</p>
      )}

      {/* Calculate Optimal Routes Button */}
      <button
        onClick={handleCalculateRoute}
        className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
      >
        Calculate Optimal Routes
      </button>
    </div>
  );
};

export default DeliveryPointsInput;