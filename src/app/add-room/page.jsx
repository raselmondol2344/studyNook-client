"use client";
import toast from "react-hot-toast";
import { Card, FieldError, Input, TextField, Label, Select, Button, TextArea, ListBox } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const addRoompage = () => {

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rooms = Object.fromEntries(formData.entries());

    try {

      const { data: tokendata } = await authClient.token();

      if (!tokendata?.token) {
        toast.error("You must be logged in to add a room!");
        return;
      }


      const res = await fetch("http://localhost:8000/rooms", {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${tokendata.token}`
        },
        body: JSON.stringify(rooms)
      });

      const data = await res.json();
      console.log(data);

      if (data.success) {
        toast.success("Room successfully added to All Rooms & My Listings!");
        e.currentTarget.reset();
      } else {
        toast.error(data.message || "Failed to add room");
      }

    } catch (error) {
      console.error("Error submitting room:", error);
      toast.error("Something went wrong while adding the room.");
    }
  };

  return (
    <div className="p-5 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold p-5">Add Room</h1>

      <Card>
        <form
          onSubmit={onSubmit}
          className="p-10 space-y-8 max-w-5xl mx-auto shadow-xl shadow-slate-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="md:col-span-2">
              <TextField name="name" isRequired>
                <Label>Room Name</Label>
                <Input placeholder="enter a room name" className="rounded-2xl" />
                <FieldError />
              </TextField>
            </div>


            <TextField name="floor" isRequired>
              <Label>Floor</Label>
              <Input placeholder="select a floor" className="rounded-2xl" />
              <FieldError />
            </TextField>


            <TextField name="hourlyRate" type="number" isRequired>
              <Label>Hourly rate (USD)</Label>
              <Input
                type="number"
                placeholder="0000"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>


            <TextField name="seatCapacity" isRequired>
              <Label>Seat capacity</Label>
              <Input
                placeholder="xxxxxx"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>


            <div className="md:col-span-2">
              <TextField name="image" isRequired>
                <Label>Image URL</Label>
                <Input
                  type="url"
                  placeholder="https://example.com/room.jpg"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>
            </div>


            <div className="md:col-span-2">
              <TextField name="description" isRequired>
                <Label>Description</Label>
                <TextArea
                  placeholder="Describe the room experience..."
                  className="rounded-3xl"
                />
                <FieldError />
              </TextField>
            </div>
          </div>


          <div>
            <Select
              name="category"
              isRequired
              className="w-full"
              placeholder="Select category"
            >
              <Label>Amenities</Label>
              <Select.Trigger className="rounded-2xl">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="WiFi" textValue="WiFi">
                    WiFi
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="Coffee Station" textValue="Coffee Station">
                    Coffee Station
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="Air Conditioning" textValue="Air Conditioning">
                    Air Conditioning
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                  <ListBox.Item id="Projector" textValue="Projector">
                    Projector
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          <Button
            type="submit"
            variant="outline"
            className="rounded-sm w-full bg-cyan-500 text-white font-semibold"
          >
            Add Room
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default addRoompage;