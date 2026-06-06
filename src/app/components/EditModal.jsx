"use client";
import { useState } from "react"; 
import { Button, FieldError, Input, Label, Modal, Surface, TextArea, TextField } from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import { useRouter } from "next/navigation"; 
export function EditModal({ roomdetails }) {
  const { _id, name, floor, category, hourlyRate, seatCapacity, description, image } = roomdetails;
  

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());


    const updatedRoomDetails = {
      ...rawData,
      hourlyRate: Number(rawData.hourlyRate),
      seatCapacity: Number(rawData.seatCapacity),
    };

    try {
      const res = await fetch(`http://localhost:8000/rooms/${_id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(updatedRoomDetails)
      });

      if (res.ok) {
        const roomdata = await res.json();
        console.log("Update Success:", roomdata);
        
        setIsOpen(false); 
        router.refresh(); 
      } else {
        console.error("Failed to update");
      }
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  return (
    <>

      <Button onPress={() => setIsOpen(true)} variant="outline" className="border border-black rounded-none">
        <BiEdit /> Edit
      </Button>
     
      <Modal isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-2xl">
              <Modal.CloseTrigger onClick={() => setIsOpen(false)} />
              <Modal.Header>
                <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                  <BiEdit />
                </Modal.Icon>
                <Modal.Heading>Edit Room</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="p-6">
                <Surface variant="default">
                  <form onSubmit={onSubmit} className="p-10 space-y-8 max-w-5xl mx-auto shadow-lg shadow-slate-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      
                      {/* Room Name */}
                      <div className="md:col-span-2">
                        <TextField defaultValue={name} name="name" isRequired>
                          <Label>Room Name</Label>
                          <Input placeholder="Bali Paradise" className="rounded-2xl" />
                          <FieldError />
                        </TextField>
                      </div>

                      {/* Floor */}
                      <TextField defaultValue={floor} name="floor" isRequired>
                        <Label>Floor</Label>
                        <Input placeholder="floor-00" className="rounded-2xl" />
                        <FieldError />
                      </TextField>

                      {/* Price */}
                      <TextField defaultValue={hourlyRate} name="hourlyRate" type="number" isRequired>
                        <Label>Price (USD)</Label>
                        <Input type="number" placeholder="1299" className="rounded-2xl" />
                        <FieldError />
                      </TextField>

                      {/* Seat Capacity */}
                      <TextField defaultValue={seatCapacity} name="seatCapacity" type="number" isRequired>
                        <Label>Seat Capacity</Label>
                        <Input type="number" placeholder="xxxxx" className="rounded-2xl" />
                        <FieldError />
                      </TextField>

                      {/* Image URL */}
                      <div className="md:col-span-2">
                        <TextField defaultValue={image} name="image" isRequired>
                          <Label>Image URL</Label>
                          <Input type="url" placeholder="https://example.com/bali-paradise.jpg" className="rounded-2xl" />
                          <FieldError />
                        </TextField>
                      </div>

                      {/* Description */}
                      <div className="md:col-span-2">
                        <TextField defaultValue={description} name="description" isRequired>
                          <Label>Description</Label>
                          <TextArea placeholder="Describe the experience..." className="rounded-3xl" />
                          <FieldError />
                        </TextField>
                      </div>
                    </div>
                    <Modal.Footer>
                   
                      <Button onClick={() => setIsOpen(false)} variant="secondary">
                        Cancel
                      </Button>
                      <Button type="submit">Confirm</Button>
                    </Modal.Footer>
                  </form>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}