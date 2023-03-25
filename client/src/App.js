import Location_Form from "./components/Location_Form";
import Friend_Request from "./components/Friend_Request";
import Pending_Requests from "./components/Pending_Requests";
import View_Friends from "./components/View_Friends";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Location_Form" element={<Location_Form />} />
        <Route path="/Friend_Request" element={<Friend_Request />} />
        <Route path="/Pending_Requests" element={<Pending_Requests />} />
        <Route path="/View_Friends" element={<View_Friends />} />
      </Routes>
    </div>
  );
}

export default App;
