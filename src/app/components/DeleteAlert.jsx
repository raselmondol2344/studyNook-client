"use client";

import { TrashBin } from "@gravity-ui/icons";
import {AlertDialog, Button} from "@heroui/react";
import { redirect } from "next/navigation";

export function DeleteAlert({roomdetails}) {
    const {_id,name} = roomdetails


     const handleCLick = async()=>{
      

        const res = await fetch (`http://localhost:8000/rooms/${_id}`,{
            method: 'DELETE',
            headers:{
                'content-type': 'application/json'
            },
           
        });
        const rooms = await res.json()
        redirect('/room')
        console.log(rooms);
    }

  return (
    <AlertDialog>
      <Button  className={'border-red-200 border text-red-500 rounded-none items-center'} variant="outiline"> <TrashBin></TrashBin> Delete</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Room permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <span className="font-semibold text-lg text-blue-500">{name}</span> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleCLick} slot="close" variant="danger">
                Delete 
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}