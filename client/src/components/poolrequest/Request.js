
import { useEffect, useState, useContext, Component } from "react";
import "./request.css";
import { getDistanceFromLatAndlng, getDistanceFromLatlng, sortFromLatAndlng, sortFromLatlng } from "../maparea/getDistance.js";
import axios from "axios";
import { AccountContext } from "../../context/AccountProvider";
import { addPoolRequest, addWaypoints, } from "../../service/api";





export default function Request({ routes, driving, str, end }) {

    const { account } = useContext(AccountContext);

    const [frndRoute, setFrndRoute] = useState([]);
    const [allRequests, setAllRequest] = useState([]);
    const isFeasible = (waypoints, myLatLng1, myLatLng2) => {
        sortFromLatlng(waypoints);
        var x1 = getDistanceFromLatlng(waypoints);
        waypoints.push(myLatLng1);
        waypoints.push(myLatLng2);
        sortFromLatlng(waypoints);
        var x2 = getDistanceFromLatlng(waypoints);
        // console.log(waypoints); 
        if (x1 && (x2 - x1) / x1 > 0.1)
            return 1;
        return 0;

    }
    
    useEffect(() => {
        // setFrndRoute([]); 
        // console.log(driving);
        // console.log(str, end);
        if (routes && !driving) {
            setFrndRoute([]);
            routes.forEach((data) => {
                if (isFeasible(data.waypoints, str, end)) { 
                    setFrndRoute([...frndRoute, data])
                    // console.log(frndRoute);
                    // handleAddressSearch(data.waypoints[0]);
                } 
                console.log(frndRoute);
                
            });
        }
    }, [routes,driving]);

    // useEffect(()=>{
    //     addAllRequest(); 
    // },[])

    // const addAllRequest=async()=>{
    //     const data = await getAllRequest();
    //     setAllRequest(data);
    // }





    // const HandleAddressSearch = async (latlng) => {
    //     console.log(latlng.latlng[0]);

    //     var loc = ""; 
    //     try {
    //       const response = await axios.get(
    //         `https://nominatim.openstreetmap.org/reverse?lat=${latlng.latlng[0].lat}&lon=${latlng.latlng[0].lat}&format=json`
    //       );
    //       loc = response.data.display_name;
    //       console.log(response.data.display_name);

    //     } catch (error) {
    //       console.error(error);
    //     }
    //     return (
    //         <div>
    //             {loc}
    //         </div>
    //     )
    //   };
    
    const handleClickRequest = async (data) => {
         
        const x = localStorage.getItem('my_id');
        const details = {
            "sender_id": x,
            "reciever_id": data.user_id,
            "route_id": data._id,
            "waypoints": [str, end],
            "seats": 1,
            "static": 0,
            "time": "",
            "misc": ""
        };
        const res = await addPoolRequest(details);
        console.log(res);
    }

    const handleClickAccept = async (data) => {
        const details = { "route_id": data.route_id }
        const res = await addWaypoints(data);
        console.log(res);
    }

    return (
        <>
        {!driving ? (<div className="Online" >
                {frndRoute && frndRoute.map((o) => (
                    <div className="chatOnlineFriend" onClick={() => handleClickRequest(o)}>
                        <p>{o.user_id} </p>
                        <button onClick={() => handleClickRequest(o)}>Send request</button>
                        {/* <HandleAddressSearch latlng={o.waypoints} /> */}
                        </div>
                        ))}
                    </div>) : (<>
                        <div className="Online" >
                        {allRequests && allRequests.map((o) => (
                            <div className="chatOnlineFriend" onClick={() => handleClickAccept(o)}>
                                <p>{o.sender_id} </p>
                                <button onClick={()=>{}}>Accept request</button>
                                {/* <HandleAddressSearch latlng={o.waypoints} /> */}
        
                            </div> 
                        ))}
                    </div>
                    </>)} 
        
        {/* </Component> */}
        </>
    );
}
 