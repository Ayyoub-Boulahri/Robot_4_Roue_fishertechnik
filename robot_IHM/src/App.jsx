import React from "react";
import { BrowserRouter as Router, Routes, Route, data } from "react-router-dom";
import Navbar from "./components/Navbar";
import Control from "./pages/Control";
import Dashboard from "./pages/Dashboard";
import LiveData from "./pages/LiveData";
import useMqtt from "./services/MqttConnection";

const App = () => {
  const { sendMessage, connected, data } = useMqtt();
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Control sendMessage={sendMessage} connected={connected} data={data} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/live-data" element={<LiveData sendMessage={sendMessage} connected={connected} data={data} />} />
      </Routes>
    </Router>
  );
};

export default App;