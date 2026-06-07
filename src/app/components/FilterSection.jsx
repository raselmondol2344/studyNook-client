"use client";

import { useState, useEffect } from "react";

const FilterSection = ({ allRooms, onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAmenity, setSelectedAmenity] = useState("");


    const uniqueAmenities = [
        ...new Set(allRooms.flatMap((room) => room.amenities || [])),
    ];


    useEffect(() => {
        const filtered = allRooms.filter((room) => {

            const matchesSearch = room.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            const matchesAmenity = selectedAmenity
                ? room.amenities?.includes(selectedAmenity)
                : true;

            return matchesSearch && matchesAmenity;
        });

        onFilterChange(filtered);
    }, [searchTerm, selectedAmenity, allRooms, onFilterChange]);

    return (
        <div className="max-w-7xl mx-auto px-10 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">

            <div className="w-full md:w-1/2">
                <input
                    type="text"
                    placeholder="Search by room name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                />
            </div>


            <div className="w-full md:w-1/3">
                <select
                    value={selectedAmenity}
                    onChange={(e) => setSelectedAmenity(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                >
                    <option value="">All Amenities</option>
                    {uniqueAmenities.map((amenity, index) => (
                        <option key={index} value={amenity}>
                            {amenity}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FilterSection;