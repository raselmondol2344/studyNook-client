"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const [isOpen, setIsOpen] = useState(false);

    const handleSignOut = async () => {
        await authClient.signOut();
    };

    return (
        <nav className="bg-gray-400 border-b border-gray-300 relative z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
                
                <Link href="/">
                    <h1 className="text-3xl md:text-4xl font-bold text-orange-700">StudyNook</h1>
                </Link>

                <div className="hidden lg:flex items-center gap-8">
                    {user ? (
                        <ul className="flex gap-6 font-medium text-gray-800">
                            <li><Link href={"/"}>Home</Link></li>
                            <li><Link href={"/room"}>Rooms</Link></li>
                            <li><Link href={"/my-bookings"}>My Booking</Link></li>
                            <li><Link href={"/my-listing"}>My Listing</Link></li>
                            <li><Link href={"/add-room"}>Add Room</Link></li>
                        </ul>
                    ) : (
                        <ul className="flex gap-8 font-medium text-gray-800">
                            <li><Link href={"/"}>Home</Link></li>
                            <li><Link href={"/room"}>Rooms</Link></li>
                        </ul>
                    )}
                </div>

                <div className="hidden lg:flex items-center gap-6">
                    {user ? (
                        <ul className="flex gap-6 items-center">
                            <li><Link href={"/profile"} className="font-medium text-gray-800">Profile</Link></li>
                            <li>
                                <Avatar>
                                    <Avatar.Image alt={user.name} src={user?.image} />
                                    <Avatar.Fallback>{user.name?.charAt(0)}</Avatar.Fallback>
                                </Avatar>
                            </li>
                            <li>
                                <Button onClick={handleSignOut} variant="danger">LogOut</Button>
                            </li>
                        </ul>
                    ) : (
                        <ul className="flex gap-6 font-medium text-gray-800 items-center">
                            <li><Link href={"/login"}>Login</Link></li>
                            <li><Link href={"/signUp"}>Sign Up</Link></li>
                        </ul>
                    )}
                </div>

                <div className="lg:hidden flex items-center">
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="text-3xl text-gray-800 focus:outline-none"
                    >
                        {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="lg:hidden bg-gray-500 border-t border-gray-300 absolute top-20 left-0 w-full p-6 flex flex-col gap-6 shadow-xl">
                    <div className="flex flex-col gap-4 font-medium text-white text-lg">
                        {user ? (
                            <>
                                <Link href={"/"} onClick={() => setIsOpen(false)}>Home</Link>
                                <Link href={"/room"} onClick={() => setIsOpen(false)}>Rooms</Link>
                                <Link href={"/my-bookings"} onClick={() => setIsOpen(false)}>My Booking</Link>
                                <Link href={"/my-listing"} onClick={() => setIsOpen(false)}>My Listing</Link>
                                <Link href={"/add-room"} onClick={() => setIsOpen(false)}>Add Room</Link>
                                <hr className="border-gray-400" />
                                <Link href={"/profile"} onClick={() => setIsOpen(false)}>Profile</Link>
                                <div className="flex items-center gap-4 mt-2">
                                    <Avatar>
                                        <Avatar.Image alt={user.name} src={user?.image} />
                                        <Avatar.Fallback>{user.name?.charAt(0)}</Avatar.Fallback>
                                    </Avatar>
                                    <span className="text-sm">{user.name}</span>
                                </div>
                                <Button onClick={() => { handleSignOut(); setIsOpen(false); }} variant="danger" className="w-full mt-2">LogOut</Button>
                            </>
                        ) : (
                            <>
                                <Link href={"/"} onClick={() => setIsOpen(false)}>Home</Link>
                                <Link href={"/room"} onClick={() => setIsOpen(false)}>Rooms</Link>
                                <hr className="border-gray-400" />
                                <Link href={"/login"} onClick={() => setIsOpen(false)}>Login</Link>
                                <Link href={"/signUp"} onClick={() => setIsOpen(false)}>Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;