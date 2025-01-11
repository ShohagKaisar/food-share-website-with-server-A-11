import { NavLink, useLoaderData } from "react-router-dom";
import Cards from "./Cards/Cards";
import "animate.css";
import Banner from "./Banner/Banner";
import VisionSection from "./VisionSection/VisionSection";
import Card2 from "./Cards/Card2";


const Home = () => {
  const datas = useLoaderData();
  const filterDatas = datas.filter(data => data.foodStatus !== "Requested")
  const filterDatasByRequest = datas.filter(data => data.foodStatus === "Requested")
  const sortedDatas = filterDatas.sort((a, b) => b.foodQuantity - a.foodQuantity);
  const limitedDatas = sortedDatas.slice(0, 6);

  return (
    <div>
      <Banner></Banner>
      {/* Featured Foods */}
      <div className="text-center my-4 border-b-2 pb-8">
        <h1 className="text-5xl font-bold italic bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Featured Foods
        </h1>
      </div>
{/* Feature Food List */}
      <div id="card" className="p-8 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 mt-4">
        {limitedDatas.map((data) => (
          <Cards key={data._id} data={data}></Cards>
        ))}
      </div>
      <div className="text-center my-4 border-b-2 pb-8">
        <h1 className="text-5xl font-bold italic bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Requested Foods
        </h1>
      </div>
{/* Requested Food List */}
      <div id="card" className="p-8 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 mt-4">
        {filterDatasByRequest.map((data) => (
          <Card2 key={data._id} data={data}></Card2>
        ))}
      </div>
      <NavLink to={"/availablefoods"}>
        <h1 className="py-2 text-center text-3xl font-bold bg-purple-300 text-purple-800 mb-4">
          See All Available Foods
        </h1>
      </NavLink>
      <VisionSection></VisionSection>
    </div>
  );
};

export default Home;
