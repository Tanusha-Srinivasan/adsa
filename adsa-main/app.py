from flask import Flask, request, jsonify
from flask_cors import CORS
import openrouteservice  # Import OpenRouteService client

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize OpenRouteService client with your API key
ORS_API_KEY = "5b3ce3597851110001cf62486bdea8c08f904bc1bf1b70ebe018faa4"  # Replace with your API key
ors_client = openrouteservice.Client(key=ORS_API_KEY)

def calculate_actual_route(depot, delivery_points):
    """Calculate the actual route using OpenRouteService."""
    try:
        # Only use the first 50 points to avoid exceeding API limits
        if len(delivery_points) > 48:  # 48 delivery points + depot at start/end = 50 points
            print(f"Warning: Trimming route from {len(delivery_points)} to 48 delivery points due to API limits")
            delivery_points = delivery_points[:48]
            
        # Convert coordinates to [longitude, latitude] format for ORS
        coordinates = [[coord[1], coord[0]] for coord in [depot] + delivery_points + [depot]]
        
        print("Coordinates being sent to OpenRouteService:", coordinates)
        
        # Call OpenRouteService Directions API
        route = ors_client.directions(
            coordinates=coordinates,
            profile="driving-car",
            format="geojson"
        )
        
        print("OpenRouteService response received")
        
        # Extract the geometry from GeoJSON response
        if "features" in route and route["features"] and "geometry" in route["features"][0]:
            geometry = route["features"][0]["geometry"]["coordinates"]  # [lon, lat]
            
            # ✅ Convert to [lat, lon] format for Leaflet
            leaflet_ready = [[coord[1], coord[0]] for coord in geometry]
            return leaflet_ready

        elif "routes" in route and route["routes"]:
            geometry = route["routes"][0]["geometry"]["coordinates"]  # [lon, lat]
            leaflet_ready = [[coord[1], coord[0]] for coord in geometry]
            return leaflet_ready
        else:
            print("No routes found in the OpenRouteService response.")
            return None
    except Exception as e:
        print(f"Error fetching route from OpenRouteService: {e}")
        return None

@app.route('/api/optimal-route', methods=['POST'])
def optimal_route():
    """API endpoint to calculate the optimal route."""
    try:
        data = request.json
        print("Received data:", data)
        depot = data.get('depot')
        delivery_points = data.get('deliveryPoints')

        if not depot or not delivery_points:
            return jsonify({'error': 'Depot and delivery points are required'}), 400

        # Calculate the actual route
        actual_route = calculate_actual_route(depot, delivery_points)

        if actual_route:
            return jsonify({'route': actual_route})
        else:
            return jsonify({'error': 'Could not calculate the actual route'}), 500
    except Exception as e:
        print(f"Error in /api/optimal-route: {e}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
