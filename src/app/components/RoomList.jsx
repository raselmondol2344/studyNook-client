"use client";

import { useState } from "react";
import CardRoom from "./CardRoom";
import FilterSection from "./FilterSection";

const RoomList = ({ initialRooms }) => {
    const [displayedRooms, setDisplayedRooms] = useState(initialRooms);

    return (
        <>

            <FilterSection
                allRooms={initialRooms}
                onFilterChange={setDisplayedRooms}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto px-10">
                {displayedRooms.length > 0 ? (
                    displayedRooms.map((data) => (
                        <CardRoom key={data._id.$oid || data._id} roomsdata={data} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 my-10">
                        No rooms found matching your criteria.
                    </p>
                )}
            </div>
        </>
    );
};

export default RoomList;