import React from "react";

const DepotInput = ({ depot, setDepot }) => {
  const handleClearDepot = () => {
    setDepot(null); // Clear the depot location
  };

  return (
    <div className="mb-6 p-4 bg-white shadow-md rounded-lg border border-gray-200 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Depot Location</h3>
        {depot ? (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Latitude:</span> {depot.lat}, <span className="font-medium">Longitude:</span> {depot.lng}
          </p>
        ) : (
          <p className="text-sm text-gray-600">Click on the map to select the depot location.</p>
        )}
      </div>
      {depot && (
        <button
          onClick={handleClearDepot}
          className="ml-4 text-red-500 font-bold text-lg px-4 py-2 border border-red-500 rounded hover:bg-red-500 hover:text-white"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default DepotInput;