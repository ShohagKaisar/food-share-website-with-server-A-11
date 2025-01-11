import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";


const MyFoodRequest = () => {

  const datas = useLoaderData();
  const { user } = useContext(AuthContext);
  const filterdedData = datas.filter(data => {
    return data.foodStatus === "Requested" && data.userEmail === user.email;
  })

  return (
<div className="overflow-x-auto">
  <div className="min-w-full sm:rounded-lg shadow-lg bg-white">
    <table className="w-full table-auto border-collapse">
      {/* Table Header */}
      <thead className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
        <tr>
          <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold">Donor Name</th>
          <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold">Food Name</th>
          <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold">Pickup Location</th>
          <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold">Expire Date</th>
          <th className="py-3 px-4 text-left text-xs sm:text-sm font-semibold">Request Date</th>
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {filterdedData.map((item, index) => (
          <tr
            key={item._id}
            className={`hover:bg-indigo-100 transition duration-300 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
          >
            <td className="py-3 px-4 text-xs sm:text-sm text-gray-800">{item.donatorName}</td>
            <td className="py-3 px-4 text-xs sm:text-sm text-gray-800">{item.foodName}</td>
            <td className="py-3 px-4 text-xs sm:text-sm text-gray-800">{item.pickupLocation}</td>
            <td className="py-3 px-4 text-xs sm:text-sm text-gray-800">{item.expiredDateTime}</td>
            <td className="py-3 px-4 text-xs sm:text-sm text-gray-800">{item.requestDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}

export default MyFoodRequest;
