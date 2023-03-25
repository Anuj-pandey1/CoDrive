import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import {getDistanceFromLatAndlng, getDistanceFromLatlng, sortFromLatAndlng, sortFromLatlng} from "./getDistance"

var waypoints = [];


const getWp = (wp) =>{
  waypoints = [];
  wp.forEach((data)=>{
    waypoints.push(L.latLng(data.lat, data.lng));
  }) 
}


const createRoutineMachineLayer = ({ position, waypoints, color }) => {
   
  getWp(waypoints);

  
  const instance = L.Routing.control({
    position,
    waypoints,
    lineOptions: {
      styles: [
        {
          color,
        },
      ],
    },
  });
  
  return instance;
};



const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;