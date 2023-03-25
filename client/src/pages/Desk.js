import { LoginDialog } from "../components/account/LoginDialog"
import { AppBar, Toolbar,styled,Box } from "@mui/material";
import { useContext, useState } from "react";
import { AccountContext } from "../context/AccountProvider";
import L from 'leaflet';
import "./desk.css";
import Mylocation from "../components/mylocation/Mylocation";

// import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import {NavLink} from 'react-router-dom'
import MapArea from '../components/maparea/MapArea.js';
import Request from "../components/poolrequest/Request";


const LoginHeader = styled(AppBar)`
  height: 220px;
  background-color: #00bfa5;
  box-shadow: none;
`;
const Header = styled(AppBar)`
  height: 10vh;
  background-color: #00A884;
  box-shadow: none;
`;
const Component=styled(Box)`
height:100vh;
background-color:#DCDCDC;
`
 const Tabs = styled(NavLink)`
   font-size: 20px;
   margin-right: 20px;
   color: white;
   text-decoration: none;
 `;
export const Desk = ()=>{

const {account}=useContext(AccountContext);

const [routes, setRoutes] = useState(null);
const [str, setStr] = useState(null);
const [end, setEnd] = useState(null);
const [driving, setDriving] = useState(1);

return (
  <Component>
    {account ? (
      <> 
        <div className="container">
        <div className="leftpanel">
          <Mylocation setStr={setStr} setEnd={setEnd} setDriving={setDriving} str={str} end={end} /> 
        </div>
          <div className="mapcontainer">
            <MapArea routes={routes} setRoutes={setRoutes} str={str} end={end}/>
          </div>
          <div className="sidecontainer">
            <Request routes={routes}  str={str} end={end} driving={driving}/>
          </div>
        </div>
        
      </>
    ) : (
      <>
        <LoginHeader>
          <Toolbar></Toolbar>
        </LoginHeader>
        <LoginDialog />
      </>
    )}
  </Component>
);

}
