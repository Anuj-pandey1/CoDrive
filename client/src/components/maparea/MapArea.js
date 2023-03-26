import React, { Component, useState,useEffect } from 'react';
import {L, MQ} from 'leaflet';
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents,LayersControl } from 'react-leaflet';
import { createControlComponent,useLeafletContext, leafletElement } from "@react-leaflet/core";
import RoutineMachine from "./RoutineMachine"; 
import './maparea.css';
import { getRoute } from '../../service/api';
import { getDistanceFromLatAndlng, getDistanceFromLatlng } from './getDistance';

const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
};


const locations = {start : "" ,mid1 : "" , mid2 : "" ,destination : "" };

export const MapArea = ({routes, setRoutes, str, end})=> {

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState([37.0902, -95.7129]);
  
  
  function LocationMarker() {
    const map = useMapEvents({
        locationfound(e) {
        setCenter([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  }

  const eventHandler =(e) =>{
    locations.e.target.name = e.target.value;
  }

  useEffect(()=>{
    findRoute();
  },[])

  const findRoute =  async() =>{
    const data = await getRoute();
    setRoutes(data.data); 
  } 
 

    return (
            <>
      <MapContainer
        center={center}
        zoom={3}
        zoomControl={false}
        style={{ height: "100vh", width: "100%", padding: 0 }}
        whenCreated={map => setMap(map)}
      >
      <LocationMarker/> 

      {routes && routes.map((route) => (
        <RoutineMachine 
        position={'topright'} 
        waypoints = {route.waypoints}
        color={'#757de8'} />
      ))}
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Map">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.base}
            />
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </>
      );
  
}

export default MapArea;


 
