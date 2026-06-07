"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import CardRoom from "../components/CardRoom";

const MyListingsPage = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [listings, setListings] = useState([]);
    const [loadingListings, setLoadingListings] = useState(true);

    useEffect(() => {
        const fetchMyListings = async () => {
            if (!user?.id) return;

            try {
                const { data: tokendata } = await authClient.token();

                const res = await fetch(`http://localhost:8000/my-listings`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${tokendata?.token}`
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setListings(data);
                } else {
                    console.error("Failed to fetch listings");
                }
            } catch (error) {
                console.error("Error fetching listings:", error);
            } finally {
                setLoadingListings(false);
            }
        };

        if (user?.id) {
            fetchMyListings();
        }
    }, [user?.id]);

    if (isPending || loadingListings) {
        return <div className="text-center py-10 font-semibold">Loading your listings...</div>;
    }

    if (!user) {
        return <div className="text-center py-10 font-semibold text-red-500">Please login to view your listings.</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4">
            <h1 className="font-bold text-3xl mt-8 mb-8">My Listed Rooms</h1>

            {listings?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map((room) => (
                        <CardRoom key={room._id} roomsdata={room} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <h2 className="text-xl font-semibold">You have not listed any rooms yet.</h2>
                </div>
            )}
        </div>
    );
};

export default MyListingsPage;