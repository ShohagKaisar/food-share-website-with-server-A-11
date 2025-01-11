/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";


const Cards = ({ data }) => {
  const { _id, foodName, foodImage, foodQuantity, pickupLocation, expiredDateTime, foodStatus } = data;

  return (
    <div className="card card-compact bg-gradient-to-b from-violet-700 via-neutral-500 to-indigo-800 shadow-xl">
      <figure className="rounded-t-lg">
        <img className="h-52 w-full"
          src={foodImage}
          alt="Image" />
      </figure>
      <div className="p-4">
        <h2 className="font-bold text-lg text-white">Food Name: {foodName}</h2>
        <p className="text-white"><span className="font-semibold">Food Quantity:</span> {foodQuantity} pcs.</p>
        <p className="text-white"><span className="font-semibold">Pickup Location:</span> {pickupLocation}</p>
        <p className="text-white"><span className="font-semibold">Expired Date:</span> {expiredDateTime}</p>
        <p className="text-white"><span className="font-semibold">Food Status:</span> {foodStatus}</p>
        <div className="card-actions justify-end">
          <NavLink to={`/details/${_id}`}><button className="hover:bg-green-500 px-4 py-2 mt-4 text-gray-300 bg-slate-900 rounded-lg">View Details</button></NavLink>
        </div>
      </div>
    </div>
  );
}

export default Cards;
