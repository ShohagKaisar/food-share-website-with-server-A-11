/* eslint-disable react/prop-types */




const Card2 = ({ data }) => {
  const { foodName, foodImage, foodQuantity, pickupLocation, expiredDateTime, foodStatus } = data;

  return (
    <div className="card card-compact bg-gradient-to-b from-yellow-400 via-lime-500 to-rose-500 shadow-xl">
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

      </div>
    </div>
  );
}

export default Card2;
