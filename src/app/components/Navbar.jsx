"use client" 

import { Avatar, Button } from "@heroui/react";

import Link from "next/link";


const Navbar = () => {
   
    return (
        <nav className="flex justify-around p-10 bg-gray-400 items-center border-b border-gray-300">
            <h1 className="text-4xl font-bold text-orange-700">StudyNook</h1>
            <ul className="flex gap-10">
                <li><Link href={"/"}>Home</Link></li>
                <li><Link href={"/room"}>Rooms</Link></li>
                <li><Link href={"/my-booking"}>My Booking</Link></li>
                <li><Link href={"/my-listing"}>My Listing</Link></li>     
                <li><Link href={"add-room"}>Add Room</Link></li>
               
            </ul>

          

             <ul className="flex gap-10">
              
              
              

                 <ul className="flex gap-10 items-center justify-end">
                     {/* <li><Link href={"/profile"}>Profile</Link></li> */}
                     
                  <li>

                    <Avatar>
                    <Avatar.Image referrerPolicy="no-referrer" alt="John Doe"  />
                    <Avatar.Fallback></Avatar.Fallback>
                </Avatar>
                  </li>

                  <li><Button  variant="danger">LogOut</Button></li>
                 </ul>
                

                

              <ul className="flex gap-3 items-center justify-center">
                 {/* <li><Link href={"/profile"}>Profile</Link></li> */}
                 <li><Link href={"/login"}>Login</Link></li>
                <li><Link href={"/signUp"}>Sing Up</Link></li>
              </ul>
               
               
            </ul>


            
        </nav>
    );
};

export default Navbar;