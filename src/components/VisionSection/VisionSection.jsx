
const VisionSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 py-16 px-6 md:px-12 text-white">
      <div className="absolute inset-0 bg-opacity-50 bg-black"></div>
      <div className="relative max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Our Vision
        </h2>
        <p className="text-lg md:text-xl leading-relaxed">
          At Food Sharing Point, we dream of a world where no food goes to waste and
          no one sleeps hungry. By fostering a culture of sharing and caring, we aim
          to bridge the gap between abundance and need, creating a sustainable and
          compassionate community.
        </p>
        <div className="mt-10">
          <div className="h-1 w-24 bg-white mx-auto"></div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
