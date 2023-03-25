import { LoginDialog } from "../components/account/LoginDialog"
import { AppBar, Toolbar,styled,Box } from "@mui/material";
import { useContext, useState } from "react";
import { AccountContext } from "../context/AccountProvider";
import L from 'leaflet';
import "./desk.css";

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

return (
  <Component>
    {account ? (
      <> 

        <div className="container">
          <div className="mapcontainer">
            <MapArea routes={routes} setRoutes={setRoutes}/>
          </div>
          <div className="sidecontainer">
            <Request routes={routes} />
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
