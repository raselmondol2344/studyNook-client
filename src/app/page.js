import Image from "next/image";
import Banner from "./components/Banner";
import LatestRooms from "./components/LatestRooms";

export default function Home() {
  return (
    <div>
      <Banner></Banner>

      <LatestRooms></LatestRooms>
    </div>
  );
}
