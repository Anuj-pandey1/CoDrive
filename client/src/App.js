   


import { Desk } from "./pages/Desk";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AccountProvider from "./context/AccountProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InfoDrawer } from "./components/drawer/InfoDrawer";
import Location_Form from "./pages/Location_Form";
import Friend_Request from "./pages/Friend_Request";
import Pending_Requests from "./pages/Pending_Requests";
import View_Friends from "./pages/View_Friends";


function App() {
  const clientId =
    "851115207315-ffolu07jdpq965qoabrn3nube0ol4v7m.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
       
      <BrowserRouter>
       
          <Routes>
            <Route path="/" element={<Desk />} /> 
            <Route path="/Location_Form" element={<Location_Form />} />
            <Route path="/Friend_Request" element={<Friend_Request />} />
            <Route path="/Pending_Requests" element={<Pending_Requests />} />
            <Route path="/View_Friends" element={<View_Friends />} />
            <Route path="/profile" element={<InfoDrawer open={true}/>} />
          </Routes>
        </BrowserRouter>
        {/* <Messenger /> */}
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;


// function App() {
//   const clientId =
//     "851115207315-ffolu07jdpq965qoabrn3nube0ol4v7m.apps.googleusercontent.com";
//   return (
//     <GoogleOAuthProvider clientId={clientId}>
//       <AccountProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Desk />} />
//             {/* <Route path="/chat" element={<ChatDialogComplete />} /> */}
//             <Route path="/profile" element={<InfoDrawer open={true} />} />
//             <Route path="/Location_Form" element={<Location_Form />} />
//             <Route path="/Friend_Request" element={<Friend_Request />} />
//             <Route path="/Pending_Requests" element={<Pending_Requests />} />
//             <Route path="/View_Friends" element={<View_Friends />} />
//           </Routes>
//         </BrowserRouter>
//         {/* <Messenger /> */}
//       </AccountProvider>
//     </GoogleOAuthProvider>
//   );
// }

// export default App;
