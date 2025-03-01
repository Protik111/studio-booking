import React from "react";
import { Route, Routes } from "react-router-dom";
import Studio from "./pages/Studio";
import Bookings from "./pages/Bookings";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Studio />} />
      <Route path="/studio" element={<Studio />} />
      <Route path="/bookings" element={<Bookings />} />
    </Routes>
  );
};

export default App;
