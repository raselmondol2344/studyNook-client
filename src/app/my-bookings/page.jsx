"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { BookingDeleteAlert } from "../components/BookingDeleteAlert";

const MyBookingPage = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [bookings, setBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!user?.id) return;

            try {

                const { data: tokendata } = await authClient.token();


                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${user.id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${tokendata?.token}`
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setBookings(data);
                } else {
                    console.error("Failed to fetch bookings, status:", res.status);
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoadingBookings(false);
            }
        };

        if (user?.id) {
            fetchBookings();
        }
    }, [user?.id]);

    if (isPending || loadingBookings) {
        return <div className="text-center py-10 font-semibold">Loading your bookings...</div>;
    }


    if (!user) {
        return <div className="text-center py-10 font-semibold text-red-500">Please login to view your bookings.</div>;
    }

    const handleDeleteSuccess = (deletedId) => {
        setBookings((prevBookings) => prevBookings.filter((b) => b._id !== deletedId));
    };

    return (
        <div className="max-w-7xl mx-auto px-4">
            <h1 className="font-bold text-3xl mt-8 mb-8">My Bookings</h1>

            <div className="space-y-5">
                {bookings?.length > 0 ? (
                    bookings.map((booking) => (
                        <div key={booking._id} className="border shadow-lg rounded-xl p-5 flex gap-10 flex-col md:flex-row items-center">
                            <div>
                                {booking.roomImage && (
                                    <Image
                                        src={booking.roomImage}
                                        width={250}
                                        height={180}
                                        alt={booking.username || "Room"}
                                        className="rounded-lg object-cover"
                                    />
                                )}
                            </div>

                            <div className="space-y-2 flex-1">
                                <h2 className="font-bold text-2xl">{booking.roomName}</h2>
                                <p><span className="font-semibold">Floor:</span> {booking.floor}</p>
                                <p><span className="font-semibold">Seats:</span> {booking.seatCapacity}</p>
                                <p className="text-cyan-500 font-bold text-xl">${booking.hourlyRate}/hour</p>
                                <p>
                                    <span className="font-semibold">Booking Date:</span>{" "}
                                    {booking.bookingDate
                                        ? new Date(booking.bookingDate).toLocaleDateString("en-BD", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })
                                        : "Not Selected"}
                                </p>
                                <p className="text-xs text-gray-500">Booking ID: {booking._id}</p>
                                <div>
                                    <BookingDeleteAlert booking={booking} onDeleteSuccess={handleDeleteSuccess}></BookingDeleteAlert>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10">
                        <h2 className="text-xl font-semibold">You Have No Bookings Yet</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookingPage;