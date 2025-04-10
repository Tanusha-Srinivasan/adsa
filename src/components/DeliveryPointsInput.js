import React from "react";

const DeliveryPointsInput = ({ deliveryPoints, setDeliveryPoints }) => {
  const handleRemovePoint = (indexToRemove) => {
    const updatedPoints = deliveryPoints.filter((_, index) => index !== indexToRemove);
    setDeliveryPoints(updatedPoints); // Update the delivery points
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
    </div>
  );
};

export default DeliveryPointsInput;