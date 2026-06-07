"use client";

import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client"; 
import toast from "react-hot-toast";

export function BookingDeleteAlert({ booking, onDeleteSuccess }) {
    const { roomName, _id } = booking;

    const handleDeleteBooking = async () => {
        try {
            const { data: tokendata } = await authClient.token();

            
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${_id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "Authorization": `Bearer ${tokendata?.token}`
                },
            });

            if (res.ok) {
                toast.success("Booking deleted successfully!");
               
                if (onDeleteSuccess) {
                    onDeleteSuccess(_id);
                }
            } else {
                const errData = await res.json();
                toast.error(errData?.message || "Failed to delete booking");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <AlertDialog>
            <Button variant="outline" className='border-red-500 text-red-500 rounded-none my-5'>
                <TrashBin /> Delete
            </Button>

            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete your Booking permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete <span className="text-cyan-500">{roomName}</span> and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button onClick={handleDeleteBooking} slot="close" variant="danger">
                                Delete
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}