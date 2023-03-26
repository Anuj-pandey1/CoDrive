import axios from 'axios';

const url = "http://localhost:8000";
export const addUser=async (data)=>{
try{
  return await axios.post(`${url}/add`,data);
}
catch(error){
console.log('Error while addUser API',error.message);
}
}

export const getUsers=async () => {
    try{
      let response = await axios.get(`${url}/users`);
      return response.data;
    }
    catch(error)
    {
        console.log("Error while getUsers API", error.message);
    }
}

export const setConversation=async (data)=>{
try{
    
   await axios.post(`${url}/conversation/add`,data)  
   console.log("po3456");
}
catch(error)
{
    console.log('Error while calling SetConversaion api',error.message);
}
}


export const getRoute=async (data)=>{
  try{
    const x = await axios.get(`${url}/route`);
    return x;
  }
  catch(error){
  console.log('Error while getRoute API',error.message);
  }
}

export const addPoolRequest=async (data)=>{
  try{
    const x = await axios.post(`${url}/poolrequest`,data);
    return x;
  }
  catch(error){
  console.log('Error while addPoolRequest API',error.message);
  }
  }

  export const addWaypoints=async (data)=>{
    try{
      const x = await axios.post(`${url}/poolrequest/accept`,data);
      return x;
    }
    catch(error){
    console.log('Error while addWaypoints API',error.message);
    }
    }
  
    export const getAllRequest=async (data)=>{
      try{
        const x = await axios.post(`${url}/allrequest`,data);
        console.log(x);
        return x;
      }
      catch(error){
      console.log('Error while addPoolRequest API',error.message);
      }
      }