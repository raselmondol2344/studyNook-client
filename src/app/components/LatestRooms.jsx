
import CardRoom from "./CardRoom";
const LatestRooms = async() => {
     const res = await fetch("http://localhost:8000/rooms")
    const roomsdata = await res.json()
    return (
       
        <div>
            <h1 className="font-bold text-xl p-10 flex justify-start ">Latest Rooms</h1>
            

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5   max-w-7xl mx-auto">
                {
                roomsdata.slice(0,6).map(data=> <CardRoom key={data._id}  roomsdata={data}></CardRoom> )
            }
            
            </div>

            
        </div>
    );
};

export default LatestRooms;