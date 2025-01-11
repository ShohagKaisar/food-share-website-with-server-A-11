import axios from 'axios';
import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../AuthProvider/AuthProvider';

const AddFood = () => {

  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    foodName: '',
    foodImage: "",
    foodQuantity: '',
    pickupLocation: '',
    expiredDateTime: '',
    additionalNotes: '',
    donatorImage: user.photoURL,
    donatorName: user.displayName,
    donatorEmail: user.email,
    foodStatus: 'Available',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://food-share-point.vercel.app/foods', formData)
      .then(data => {
        console.log(data);
        if (data.data.insertedId) {
          Swal.fire({
            title: "Food Added Successfully !",
            icon: "success"
          });
          setFormData({
            foodName: '',
            foodImage: "",
            foodQuantity: '',
            pickupLocation: '',
            expiredDateTime: '',
            additionalNotes: '',
            donatorImage: user.photoURL,
            donatorName: user.displayName,
            donatorEmail: user.email,
            foodStatus: '',
          });
        }
      })
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="w-full bg-green-300 p-8 rounded-lg shadow-md grid lg:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center col-span-2 text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Add Food
        </h2>

        {/* Food Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Food Name</label>
          <input
            type="text"
            name="foodName"
            value={formData.foodName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Food Image */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Food Image</label>
          <input
            type="text"
            name="foodImage"
            value={formData.foodImage}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Food Quantity */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Food Quantity</label>
          <input
            type="number"
            name="foodQuantity"
            value={formData.foodQuantity}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Pickup Location */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Pickup Location</label>
          <input
            type="text"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Food Status */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Food Status</label>
          <select
            name="foodStatus"
            value={formData.foodStatus}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="available" selected>Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>


        {/* Expired Date/Time */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Expired Date</label>
          <input
            type="date"
            name="expiredDateTime"
            value={formData.expiredDateTime}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Additional Notes */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Additional Notes</label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>

        {/* Donator Image */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Donator Image</label>
          <input
            type="text"
            name="donatorImage"
            value={formData.donatorImage}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Donator Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Donator Name</label>
          <input
            type="text"
            name="donatorName"
            value={formData.donatorName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Donator Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Donator Email</label>
          <input
            type="email"
            name="donatorEmail"
            value={formData.donatorEmail}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Add Button */}
        <button
          type="submit"
          className="col-span-2 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddFood;

