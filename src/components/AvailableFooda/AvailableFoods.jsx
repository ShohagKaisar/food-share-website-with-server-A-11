import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const AvailableFoods = () => {
  // State for search input
  const [searchQuery, setSearchQuery] = useState("");
  // State for grid layout toggle
  const [threeColum, setThreeColum] = useState(true);

  // Fetch data using TanStack Query
  const { data: datas = [], isLoading, error } = useQuery({
    queryKey: ["foods"],
    queryFn: async () => {
      const response = await fetch("https://food-share-point.vercel.app/foods");
      if (!response.ok) {
        throw new Error("Failed to fetch foods");
      }
      return response.json();
    }
  });

  if (isLoading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-6 text-red-500">Error: {error.message}</div>;
  }

  // Filter data by food status
  const filteredData = datas.filter((data) => data.foodStatus === "Available");


  // Filter data by search query
  const searchedData = filteredData.filter((item) =>
    item.foodName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex justify-between">
        {/* Search input */}
        <div className="mb-6 flex items-center">
          <label className="lg:text-2xl font-semibold mr-4">Search Food: </label>
          <input
            type="text"
            placeholder="Search by Food Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        <div className="mb-6 hidden lg:block">
          <button
            onClick={() => setThreeColum(!threeColum)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            {threeColum ? "Change to Two-Column Layout" : "Change to Three-Column Layout"}
          </button>
        </div>
      </div>

      {/* Food items */}
      <div
        className={`grid gap-4 mt-8 ${threeColum ? "md:grid-cols-3" : "md:grid-cols-2 px-32"
          } grid-cols-1`}
      >
        {searchedData.map((item) => (
          <div key={item._id}>
            <div className="card card-compact bg-gradient-to-b from-violet-700 via-neutral-500 to-indigo-800 shadow-xl">
              <figure className="rounded-t-lg">
                <img className="h-52 w-full" src={item.foodImage} alt="Image" />
              </figure>
              <div className="p-4">
                <h2 className="font-bold text-lg text-white">
                  Food Name: {item.foodName}
                </h2>
                <p className="text-white">
                  <span className="font-semibold">Food Quantity:</span> {item.foodQuantity} pcs.
                </p>
                <p className="text-white">
                  <span className="font-semibold">Pickup Location:</span> {item.pickupLocation}
                </p>
                <p className="text-white">
                  <span className="font-semibold">Expired Date:</span> {item.expiredDateTime}
                </p>
                <p className="text-white">
                  <span className="font-semibold">Food Status:</span> {item.foodStatus}
                </p>
                <div className="card-actions justify-end">
                  <NavLink to={`/details/${item._id}`}>
                    <button className="hover:bg-green-500 px-4 py-2 mt-4 text-gray-300 bg-slate-900 rounded-lg">
                      View Details
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No results message */}
      {searchedData.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No foods found.</p>
      )}
    </div>
  );
};

export default AvailableFoods;
