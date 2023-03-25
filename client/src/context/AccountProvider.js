import { createContext,useEffect, useState } from "react";

export const AccountContext=createContext(null);

const AccountProvider=({children})=>{

    const [account,setAccount]=useState();
    const [person,setPerson]=useState({});

    useEffect(()=>{
        const user = localStorage.getItem('user');
        if(user){
            setAccount(user);
        }
    },[]);

    return (
        <AccountContext.Provider value={{account,setAccount,person,setPerson}}>
{children}
        </AccountContext.Provider>
    )
}

export default AccountProvider;