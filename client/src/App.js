import Location_Form from "./components/Location_Form";
import Friend_Request from "./components/Friend_Request";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Location_Form" element={<Location_Form />} />
        <Route path="/Friend_Request" element={<Friend_Request />} />
      </Routes>
    </div>
  );
}

export default App;
