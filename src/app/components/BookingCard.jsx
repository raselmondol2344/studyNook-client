"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Card, DateField, Label } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";

const BookingCard = ({ roomdetails }) => {
    const {
        _id,name,floor,category,hourlyRate,seatCapacity,description,image,} = roomdetails;

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [bookingDate, setBookingDate] = useState(null);

    const handleBooking = async () => {
        if (!user) {
            toast.error("Please login first");
            return;
        }

        if (!bookingDate) {
            toast.error("Please select a booking date");
            return;
        }

        const bookingData = {
            userId: user.id,
            userImage: user.image,
            username: user.name,

            roomId: _id,
            roomName: name,
            roomImage: image,
            floor,
            category,
            hourlyRate,
            seatCapacity,

            bookingDate: new Date(bookingDate),
        };

        try {

            const {data:tokendata} = await authClient.token()
            console.log("TOKEN DATA:", tokendata);
            console.log("TOKEN:", tokendata?.token);
         
            const res = await fetch("http://localhost:8000/bookings", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                     authorization: `Bearer ${tokendata?.token}`
                },
                body: JSON.stringify(bookingData),
            });

            const data = await res.json();

            if (data.insertedId || data.acknowledged) {
                toast.success("Room booked successfully!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Booking failed");
        }
    };

    return (
        <Card className="border shadow-2xl p-5">
            <p>Starting from</p>

            <h3>
                <span className="text-2xl text-cyan-500 font-bold">
                    ${hourlyRate}
                </span>
                <span className="text-sm"> for this room</span>
            </h3>

            <DateField
                onChange={setBookingDate}
                className="w-full"
                name="date"
            >
                <Label>Booking Date</Label>

                <DateField.Group>
                    <DateField.Input>
                        {(segment) => (
                            <DateField.Segment segment={segment} />
                        )}
                    </DateField.Input>
                </DateField.Group>
            </DateField>

            <Button
                onClick={handleBooking}
                className="bg-cyan-500 text-white w-full mt-4"
            >
                Book Now
            </Button>
        </Card>
    );
};

export default BookingCard;