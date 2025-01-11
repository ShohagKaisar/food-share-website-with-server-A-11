import { useContext, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Details = () => {
  const items = useLoaderData();
  const { _id } = useParams();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const navigate = useNavigate();

  const details = items.find((item) => item._id === _id);
  const {
    foodName,
    foodImage,
    foodQuantity,
    pickupLocation,
    expiredDateTime,
    foodStatus,
    additionalNotes: itemNotes,
    donatorEmail,
    donatorName,
  } = details;

  const handleRequest = () => {
    const requestData = {
      foodName,
      foodImage,
      foodId: _id,
      donatorEmail,
      donatorName,
      userEmail: user.email,
      requestDate: new Date().toLocaleString(),
      pickupLocation,
      expiredDateTime,
      additionalNotes,
    };

    fetch(`https://food-share-point.vercel.app/foods/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Request Sent!",
            text: "Your request has been successfully submitted.",
            icon: "success",
          });
          setShowModal(false);
          navigate("/myfoodrequest")
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      });
  };

  return (
    <div className="relative w-full">
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row w-full max-w-6xl mx-auto p-4">
          <img
            src={foodImage}
            className="w-full lg:w-1/2 max-h-96 object-cover rounded-lg shadow-2xl"
            alt="Food Image"
          />
          <div className="w-full lg:w-1/2 p-4">
            <h1 className="text-3xl lg:text-4xl font-bold py-2">{foodName}</h1>
            <div>
              <p className="my-2">
                <span className="text-lg font-semibold">Quantity:</span> {foodQuantity} pcs.
              </p>
              <p>
                <span className="text-lg font-semibold">Food Status:</span> {foodStatus}
              </p>
              <p className="my-2">
                <span className="text-lg font-semibold">Pickup Station:</span> {pickupLocation}
              </p>
              <p className="my-2">
                <span className="text-lg font-semibold">Expired Date:</span> {expiredDateTime}
              </p>
              <p className="my-2">
                <span className="text-lg font-semibold">Additional Notes:</span> {itemNotes}
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 px-4 py-2 bg-yellow-300 rounded-lg hover:bg-yellow-800 hover:text-white"
              >
                Request Food
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="absolute top-0 left-0 w-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg mx-auto shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Request Food</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold">Food Name:</label>
                <p className="text-lg font-semibold">{foodName}</p>
              </div>
              <div>
                <label className="block font-semibold">Food Image:</label>
                <img src={foodImage} alt="Food" className="w-20 h-20 rounded-lg" />
              </div>
              <div>
                <label className="block font-semibold">Food ID:</label>
                <p>{_id}</p>
              </div>
              <div>
                <label className="block font-semibold">Donator Email:</label>
                <p>{donatorEmail}</p>
              </div>
              <div>
                <label className="block font-semibold">Donator Name:</label>
                <p>{donatorName}</p>
              </div>
              <div>
                <label className="block font-semibold">User Email:</label>
                <p>{user.email}</p>
              </div>
              <div>
                <label className="block font-semibold">Request Date:</label>
                <p>{new Date().toLocaleString()}</p>
              </div>
              <div>
                <label className="block font-semibold">Pickup Location:</label>
                <p>{pickupLocation}</p>
              </div>
              <div>
                <label className="block font-semibold">Expire Date:</label>
                <p>{expiredDateTime}</p>
              </div>
              <div className="col-span-2">
                <label className="block font-semibold">Additional Notes:</label>
                <textarea
                  className="w-full border rounded p-2"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Enter any additional notes..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleRequest}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
