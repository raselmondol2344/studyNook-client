import Image from "next/image";
import Banner from "./components/Banner";
import LatestRooms from "./components/LatestRooms";
import WhyStudy from "./components/WhyStudy";
import HowWorkIt from "./components/HowWorkIt";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

export default function Home() {
  return (
    <div>
      <Banner></Banner>

      <LatestRooms ></LatestRooms>

      <WhyStudy></WhyStudy>

      <HowWorkIt></HowWorkIt>

      <div className="flex justify-center">
        <Link href={'/room'}><button className="btn btn-primary mt-8 w-50 bg-orange-600 rounded-lg p-3 text-xl font-bold text-white
            flex gap-2 items-center">
             Explore Rooms <span> <HiArrowRight /></span>
            </button></Link>
      </div>
    </div>
  );
}
