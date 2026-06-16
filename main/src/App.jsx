import React from "react";
import Start from "./Start.jsx";
import { Outlet, Link, Navigate } from "react-router-dom";
import { ProfileProvider } from "./Data/Profile.jsx";

function App() {
  return (
    <ProfileProvider>
      <Outlet />
    </ProfileProvider>
  );
}

export default App;
