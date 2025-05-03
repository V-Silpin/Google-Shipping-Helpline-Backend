"use client";
import React from "react";

function MainComponent() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [priorities, setPriorities] = useState({
    cost: 50,
    time: 50,
    carbon: 50,
  });
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRoutes = async () => {
    if (!origin || !destination) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/calculate-route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin,
          destination,
          priorities,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to calculate routes");
      }

      const data = await response.json();
      setRoutes(data.routes);
    } catch (err) {
      console.error(err);
      setError("Could not calculate routes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (origin && destination) {
      fetchRoutes();
    }
  }, [origin, destination, priorities]);

  const fetchPlaceSuggestions = async (input, type) => {
    try {
      const response = await fetch(
        `/integrations/google-place-autocomplete/autocomplete/json?input=${input}&radius=500`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }
      const data = await response.json();
      if (type === "origin") {
        setOriginSuggestions(data.predictions);
      } else {
        setDestinationSuggestions(data.predictions);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold font-roboto">Route Planning</h2>
            <a
              href="/disruptions"
              className="text-blue-600 hover:text-blue-800"
            >
              Manage Disruptions
            </a>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Origin</label>
              <input
                type="text"
                name="origin"
                className="w-full border rounded-md p-2"
                value={origin}
                onChange={(e) => {
                  setOrigin(e.target.value);
                  fetchPlaceSuggestions(e.target.value, "origin");
                }}
              />
              {originSuggestions.length > 0 && (
                <ul className="mt-1 border rounded-md bg-white shadow-sm">
                  {originSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.place_id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setOrigin(suggestion.description);
                        setOriginSuggestions([]);
                      }}
                    >
                      {suggestion.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Destination
              </label>
              <input
                type="text"
                name="destination"
                className="w-full border rounded-md p-2"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  fetchPlaceSuggestions(e.target.value, "destination");
                }}
              />
              {destinationSuggestions.length > 0 && (
                <ul className="mt-1 border rounded-md bg-white shadow-sm">
                  {destinationSuggestions.map((suggestion) => (
                    <li
                      key={suggestion.place_id}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setDestination(suggestion.description);
                        setDestinationSuggestions([]);
                      }}
                    >
                      {suggestion.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <h3 className="font-medium mb-2">Optimization Priorities</h3>
              <div className="space-y-2">
                <label className="block text-sm">Cost</label>
                <input
                  type="range"
                  name="cost"
                  min="0"
                  max="100"
                  value={priorities.cost}
                  onChange={(e) =>
                    setPriorities({
                      ...priorities,
                      cost: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
                <label className="block text-sm">Time</label>
                <input
                  type="range"
                  name="time"
                  min="0"
                  max="100"
                  value={priorities.time}
                  onChange={(e) =>
                    setPriorities({
                      ...priorities,
                      time: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
                <label className="block text-sm">Carbon Footprint</label>
                <input
                  type="range"
                  name="carbon"
                  min="0"
                  max="100"
                  value={priorities.carbon}
                  onChange={(e) =>
                    setPriorities({
                      ...priorities,
                      carbon: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6 h-[400px] flex items-center justify-center">
            <span className="text-gray-500">Map Visualization Area</span>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-bold">Transport Mode Comparison</h3>
            </div>
            {error && <div className="p-4 bg-red-50 text-red-700">{error}</div>}
            {loading ? (
              <div className="p-4 text-center">Calculating routes...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Mode</th>
                      <th className="px-4 py-2 text-left">Time</th>
                      <th className="px-4 py-2 text-left">Cost</th>
                      <th className="px-4 py-2 text-left">Carbon</th>
                      <th className="px-4 py-2 text-left">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {routes.map((route, index) => (
                      <tr
                        key={route.id}
                        className={`border-t ${
                          index === 0 ? "bg-green-50" : ""
                        }`}
                      >
                        <td className="px-4 py-2 capitalize">
                          {route.transport_mode_id === 1
                            ? "Truck"
                            : route.transport_mode_id === 2
                            ? "Rail"
                            : route.transport_mode_id === 3
                            ? "Air"
                            : "Sea"}
                        </td>
                        <td className="px-4 py-2">
                          {Math.round(route.estimated_time_hours)} hours
                        </td>
                        <td className="px-4 py-2">
                          ${Math.round(route.estimated_cost).toLocaleString()}
                        </td>
                        <td className="px-4 py-2">
                          {Math.round(route.carbon_footprint)} tons
                        </td>
                        <td className="px-4 py-2">
                          {Math.round(route.score * 100)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {routes.length > 0 && routes[0].disruptions.length > 0 && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h3 className="font-bold">Active Disruptions</h3>
              </div>
              <div className="p-4">
                {routes[0].disruptions.map((disruption, index) => (
                  <div
                    key={disruption.id}
                    className="flex items-center justify-between p-2 border-b last:border-0"
                  >
                    <div>
                      <span className="font-medium">{disruption.type}</span>
                      <p className="text-sm text-gray-600">
                        {disruption.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          disruption.severity >= 4
                            ? "bg-red-100 text-red-800"
                            : disruption.severity >= 2
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        Level {disruption.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;