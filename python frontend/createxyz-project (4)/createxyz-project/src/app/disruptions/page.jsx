"use client";
import React from "react";

function MainComponent() {
  const [disruptions, setDisruptions] = useState([]);
  const [editingDisruption, setEditingDisruption] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("startTime");
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    location: "",
    type: "Weather",
    severity: 1,
    description: "",
    startTime: new Date().toISOString().split("T")[0],
  });

  const fetchDisruptions = async () => {
    try {
      const response = await fetch("/api/disruptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "list" }),
      });
      if (!response.ok) throw new Error("Failed to fetch disruptions");
      const data = await response.json();
      setDisruptions(data.disruptions);
    } catch (err) {
      setError("Failed to load disruptions");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDisruptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/disruptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: editingDisruption ? "update" : "create",
          disruption: editingDisruption
            ? { ...formData, id: editingDisruption.id }
            : formData,
        }),
      });
      if (!response.ok) throw new Error("Failed to save disruption");
      fetchDisruptions();
      setEditingDisruption(null);
      setFormData({
        location: "",
        type: "Weather",
        severity: 1,
        description: "",
        startTime: new Date().toISOString().split("T")[0],
      });
    } catch (err) {
      setError("Failed to save disruption");
      console.error(err);
    }
  };

  const handleResolve = async (disruption) => {
    try {
      const response = await fetch("/api/disruptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "resolve",
          disruption: { id: disruption.id },
        }),
      });
      if (!response.ok) throw new Error("Failed to resolve disruption");
      fetchDisruptions();
    } catch (err) {
      setError("Failed to resolve disruption");
      console.error(err);
    }
  };

  const filteredDisruptions = disruptions
    .filter((d) => filterType === "all" || d.type === filterType)
    .sort((a, b) => {
      if (sortBy === "severity") return b.severity - a.severity;
      if (sortBy === "startTime")
        return new Date(b.start_time) - new Date(a.start_time);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-roboto mb-2">
            Disruption Manager
          </h1>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md">
              {error}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 font-roboto">
                {editingDisruption ? "Edit Disruption" : "Add New Disruption"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    className="w-full border rounded-md p-2"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Type</label>
                  <select
                    name="type"
                    className="w-full border rounded-md p-2"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                  >
                    <option>Weather</option>
                    <option>Technical</option>
                    <option>Strike</option>
                    <option>Accident</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Severity (1-5)
                  </label>
                  <input
                    type="number"
                    name="severity"
                    min="1"
                    max="5"
                    className="w-full border rounded-md p-2"
                    value={formData.severity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        severity: parseInt(e.target.value),
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="w-full border rounded-md p-2"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startTime"
                    className="w-full border rounded-md p-2"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    {editingDisruption ? "Update" : "Add"} Disruption
                  </button>
                  {editingDisruption && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingDisruption(null);
                        setFormData({
                          location: "",
                          type: "Weather",
                          severity: 1,
                          description: "",
                          startTime: new Date().toISOString().split("T")[0],
                        });
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-xl font-bold font-roboto">
                    Active Disruptions
                  </h2>
                  <div className="flex gap-4">
                    <select
                      className="border rounded-md p-2"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="all">All Types</option>
                      <option value="Weather">Weather</option>
                      <option value="Technical">Technical</option>
                      <option value="Strike">Strike</option>
                      <option value="Accident">Accident</option>
                      <option value="Other">Other</option>
                    </select>
                    <select
                      className="border rounded-md p-2"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="startTime">Sort by Date</option>
                      <option value="severity">Sort by Severity</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Location</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Severity</th>
                      <th className="px-4 py-2 text-left">Start Date</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDisruptions.map((disruption) => (
                      <tr key={disruption.id} className="border-t">
                        <td className="px-4 py-2">{disruption.location}</td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 rounded-full text-sm bg-gray-100">
                            {disruption.type}
                          </span>
                        </td>
                        <td className="px-4 py-2">
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
                        </td>
                        <td className="px-4 py-2">
                          {new Date(disruption.start_time).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditingDisruption(disruption);
                                setFormData({
                                  location: disruption.location,
                                  type: disruption.type,
                                  severity: disruption.severity,
                                  description: disruption.description,
                                  startTime: new Date(disruption.start_time)
                                    .toISOString()
                                    .split("T")[0],
                                });
                              }}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              onClick={() => handleResolve(disruption)}
                              className="text-green-600 hover:text-green-800"
                            >
                              <i className="fas fa-check"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;