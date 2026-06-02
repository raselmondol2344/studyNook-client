import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";

const Banner = () => {
  return (
    <section className="min-h-screen flex items-center bg-gray-300 ">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">

          {/* Left Side Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Find Your Perfect
              <span className="block text-primary">
                Study Room
              </span>
            </h1>

            <p className="mt-6 text-gray-500 text-base md:text-lg max-w-xl">
              Reserve quiet, comfortable library rooms in seconds.
              Create the ideal environment for studying, research,
              and collaboration without distractions.
            </p>

            <button className="btn btn-primary mt-8 w-50 bg-orange-600 rounded-lg p-3 text-xl font-bold text-white
            flex gap-2 items-center">
             Explore Rooms <span> <HiArrowRight /></span>
            </button>
          </div>

          {/* Right Side Image */}
          <div className="flex-1">
            <Image
              src="/assests/libary.jpg"
              alt="Library Room"
              width={800}
              height={600}
              priority
              className="w-full rounded-2xl shadow-lg object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;