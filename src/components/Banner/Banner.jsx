

const Banner = () => {
  return (
    <div
      className="relative w-full h-80 bg-cover bg-center"
      style={{
        backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url("https://i.ibb.co.com/LPvSYhp/banner.jpg")',
      }}
    >
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-transparent to-orange-400 opacity-20 animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Share the Love, Share the Food
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-6 drop-shadow-md">
          Join our community and share meals with those in need.
        </p>
        <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 text-lg rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-2xl">
          <a href="#card">Get Started</a>
        </button>
      </div>
    </div>
  );
};

export default Banner;
