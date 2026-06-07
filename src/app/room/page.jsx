import CardRoom from "../components/CardRoom";
import RoomList from "../components/RoomList";


const allroomspage = async() => {
    const res = await fetch("http://localhost:8000/rooms")
    const roomsdata = await res.json()
    //console.log(roomsdata);
    return (
        <div >
            <h1 className="font-bold text-xl p-10 flex justify-start ">All Room</h1>
            <RoomList initialRooms={roomsdata}></RoomList>
            

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5   max-w-7xl mx-auto">
                {
                roomsdata.map(data=> <CardRoom key={data._id}  roomsdata={data}></CardRoom> )
            }
            
            </div>

           
        </div>
    );
};

export default allroomspage;