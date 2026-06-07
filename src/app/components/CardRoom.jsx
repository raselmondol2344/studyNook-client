import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
//import { MdDateRange } from "react-icons/md";


const CardRoom = ({roomsdata}) => {
 const {_id,name,floor,hourlyRate,seatCapacity,description,image} = roomsdata;

  console.log(roomsdata);
 
    return (
        <div >
            <div className="card bg-gray-100  shadow-lg">
  <figure className="px-10 pt-10">

    {image && image.trim() !== "" && (
  <Image
    src={image}
    height={400}
    width={400}
    alt={name}
    className="w-full h-56 object-cover rounded-xl"
  />
)}

   

  </figure>

  <div id="main" className="flex justify-between items-center p-5 ">
    <div id="one" className="space-y-2">
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p>{floor}</p>
        <p>{seatCapacity}</p>

      </div>
      
      <div >
        <Link href={`/room/${_id}`} className="link link-primary   text-blue-500 flex gap-2 items-center"> <FaExternalLinkAlt /> details</Link>
       
      </div>


    </div>

    <div id="two">
      <h3 className="text=lg font-bold">${hourlyRate}</h3>

    </div>
  </div>




 
 
</div>
            
        </div>
    );
};

export default CardRoom;