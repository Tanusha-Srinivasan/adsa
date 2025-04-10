import React, { useState } from "react";
import MapComponent from "./components/MapComponent";
import DepotInput from "./components/DepotInput";
import DeliveryPointsInput from "./components/DeliveryPointsInput";

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
    <div className="flex h-screen">
      <div className="w-1/2">
        <MapComponent
          depot={depot}
          deliveryPoints={deliveryPoints}
          onMapClick={handleMapClick}
        />
      </div>
      <div className="w-1/2 bg-gray-100 p-6 overflow-y-auto">
        <DepotInput depot={depot} setDepot={setDepot} />
        <DeliveryPointsInput
        deliveryPoints={deliveryPoints}
         setDeliveryPoints={setDeliveryPoints}
        />
      </div>
    </div>
  );
};

export default App;