import React from "react";
import { Outlet } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import {  useGlobal } from "./Global.jsx";
import { ProfileProvider } from "./Data/Profile.jsx";

function App() {
  const { handleDrop } = useGlobal();
  console.log(handleDrop);

  return (
      <DndContext onDragEnd={handleDrop} modifiers={[restrictToWindowEdges]}>
        <ProfileProvider>
          <Outlet />
        </ProfileProvider>
      </DndContext>
  );
}

export default App;
