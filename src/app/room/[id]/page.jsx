//import BookingCard from "@/app/components/BookingCard";
//import { DeleteAlert } from "@/app/components/DeleteAlert";
//import { EditModal } from "@/app/components/EditModal";
//import { auth } from "@/lib/auth";
import { Button, Card, DateField, Label} from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";

import { FiMapPin } from "react-icons/fi";
import { MdDateRange } from "react-icons/md";


const desdetailspage =async ({params}) => {
    const {id} =await params

    
    
    //console.log(token);

    const res = await fetch(`http://localhost:8000/rooms/${id}`)
    const roomdetails = await res.json()

    const {_id,name,floor,hourlyRate,seatCapacity,description,image} = roomdetails
    console.log(roomdetails);
    return (
      
        
           <div className="card lg:card-side bg-base-100 shadow-sm ">
            {/* <div className="flex justify-end mt-5 mb-3 gap-5 ">
              <EditModal destination = {destination} ></EditModal>

              <DeleteAlert destination = {destination}></DeleteAlert>
        
        
      </div> */}
 <div className="flex gap-10 items-center"> 
    <div>
     <figure>
   {image ? (
  <Image
    src={image}
    height={500}
    width={500}
    alt={name}
    className="w-70 md:w-100 lg:w-150 h-50 md:h-80 lg:h-100 object-cover rounded-xl"
  />
) : (
  <div className="w-70 md:w-100 lg:w-150 h-50 md:h-80 lg:h-100 bg-gray-200 rounded-xl flex items-center justify-center">
    No Image
  </div>
)}
  </figure>
 </div>


  <div className="card-body">
    <div id="main" className="flex justify-between items-center gap-20 ">
    <div id="one" className="space-y-2">
     <div className="flex justify-between">
         <div className="flex gap-1 items-center">
         <h1 className="text-xl font-bold">{name}</h1>
      </div>

    
      
     </div>

      <div>
        <h3 className="text-lg font-semibold">{hourlyRate}</h3>
      </div>
      <div className="flex gap-2 items-center">
       <h3>{seatCapacity}</h3>
      </div>
      <div>
        {description}
      </div>
       

    </div>

   {/* <div id="two">
    <BookingCard destination={destination}></BookingCard>
   </div> */}
  </div>
  </div>
 </div>
</div>
       
    );
};

export default desdetailspage;