import './App.css'; 
import { Desk } from './pages/Desk';
import { GoogleOAuthProvider } from "@react-oauth/google";
import AccountProvider from './context/AccountProvider'; 
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { InfoDrawer } from './components/drawer/InfoDrawer'; 
function App() {
  const clientId =
    "851115207315-ffolu07jdpq965qoabrn3nube0ol4v7m.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Desk />} />
            {/* <Route path="/chat" element={<ChatDialogComplete />} /> */}
            <Route path="/profile" element={<InfoDrawer open={true}/>} />
          </Routes>
        </BrowserRouter>
        {/* <Messenger /> */}
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
