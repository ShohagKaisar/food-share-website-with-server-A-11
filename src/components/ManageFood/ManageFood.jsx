import { useContext, useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";


const ManageFood = () => {

  const datas = useLoaderData();
  const { user } = useContext(AuthContext);
  const filteredData = datas.filter(data => {
    return data.donatorEmail === user.email
  })

  const [food, setFood] = useState(filteredData)

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://food-share-point.vercel.app/foods/${_id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Coffee has been deleted.",
                icon: "success"
              })
              const remaining = food.filter(coffee => coffee._id !== _id);
              setFood(remaining);
            }
          })
      }
    });
  }

  return (
    <div className="bg-gradient-to-r from-blue-900 to-indigo-800 p-6  shadow-lg">
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="table table-auto w-full border-separate border-spacing-y-2">
          {/* head */}
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="py-2 px-4">Food Name</th>
              <th className="py-2 px-4">Donar Name</th>
              <th className="py-2 px-4">Donar Email</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Expired Date</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {food.map(item => (
              <tr key={item._id} className="bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out">
                <td className="py-2 px-4">{item.foodName}</td>
                <td className="py-2 px-4">{item.donatorName}</td>
                <td className="py-2 px-4">{item.donatorEmail}</td>
                <td className="py-2 px-4">{item.foodQuantity} pcs.</td>
                <td className="py-2 px-4">{item.expiredDateTime}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-lg text-sm font-medium ${item.foodStatus === "Available" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                  >
                    {item.foodStatus}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <div className="flex flex-col lg:flex-row gap-2 justify-center">
                    <NavLink to={`/update/${item._id}`}><button className="px-3 py-1 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-300">
                      Update
                    </button></NavLink>
                    <button onClick={() => handleDelete(item._id)} className="px-3 py-1 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
}

export default ManageFood;
