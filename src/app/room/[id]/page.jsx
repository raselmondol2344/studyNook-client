import BookingCard from "@/app/components/BookingCard";
import { DeleteAlert } from "@/app/components/DeleteAlert";
import { EditModal } from "@/app/components/EditModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

const desdetailspage = async ({ params }) => {
    const { id } = await params

    const tokenObj = await auth.api.getToken({
        headers: await headers()
    }).catch(() => null);

    if (!tokenObj?.token) {
        redirect("/login");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`, {
        headers: {
            authorization: `Bearer ${tokenObj.token}`
        }
    })
    
    if (!res.ok) {
        return <div className="text-center py-10 font-semibold text-red-500">Failed to load room details</div>;
    }

    const roomdetails = await res.json()
    const { name, floor, hourlyRate, seatCapacity, description, image } = roomdetails

    return (
        <div className="max-w-8xl mx-auto p-4 md:p-6">
            <div className="flex justify-end gap-3 mb-5 flex-wrap">
                <EditModal roomdetails={roomdetails} />
                <DeleteAlert roomdetails={roomdetails} />
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
                <div className="w-full lg:w-1/2">
                    {image ? (
                        <Image
                            src={image}
                            width={500}
                            height={500}
                            alt={name}
                            className="w-full h-64 md:h-96 lg:h-[500px] object-cover rounded-xl"
                        />
                    ) : (
                        <div className="w-full h-64 md:h-96 lg:h-[500px] bg-gray-200 rounded-xl flex items-center justify-center">
                            No Image
                        </div>
                    )}
                </div>

                <div className="flex-1 w-full">
                    <div className="flex flex-col xl:flex-row gap-8 justify-between items-start xl:items-center">
                        <div className="flex-1 space-y-4">
                            <h1 className="text-2xl md:text-3xl font-bold">
                                {name}
                            </h1>

                            <div className="flex items-center gap-2">
                                <span className="font-medium">Floor:</span>
                                <span>{floor}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="font-medium">Seat Capacity:</span>
                                <span>{seatCapacity}</span>
                            </div>

                            <p className="text-gray-600 leading-relaxed">
                                {description}
                            </p>
                        </div>

                        <div className="w-full xl:w-[350px] shrink-0">
                            <BookingCard roomdetails={roomdetails} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default desdetailspage;