import express from 'express'
import { acceptPoolRequest, addPoolRequest, addUser,getRoute, postRoute } from '../controller/user-controller.js';
import {getUsers} from '../controller/user-controller.js'; 
const route=express.Router();


route.post('/add',addUser);
route.get('/users',getUsers);
route.post('/route',postRoute);
route.get('/route',getRoute);
route.post('/poolrequest/accept',acceptPoolRequest);
route.post('/poolrequest',addPoolRequest);
export default route;