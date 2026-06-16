import React, { useEffect, useState, useRef } from "react";
import { DndContext } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import lilumTheme ,{ LilumThemeContext, useLilumTheme } from "./Theme.jsx";
import { useProfile } from "../../Data/Profile.jsx";



import Notes from "../../Application/Notes.jsx";
import ThisPC from "../../Application/ThisPC.jsx";
import Commonnet from '../../Application/Commonnet/Commonnet.jsx';
import Example from "../../Application/EXAMPLE.jsx";

import ClockBar from './ClockBar.jsx'
import ProfileBar from "./ProfileBar.jsx";

import { useClock } from '../../Component/Clock.jsx'


//---------- Import App component here  ----- 
const Lilum = () => {
  const { profiles, setProfiles } = useProfile();

  const profile = profiles.lilum;
  function setProfile(e) {
  setProfiles(prev => ({
    ...prev,
    lilum:
      typeof e === "function"
        ? e(prev.lilum)
        : e
  }));
}

  //All apps
  const [apps, setApps] = useState([
    //gIcon OR 1 = google fonts icon
    {
      id: 1,
      title: "This PC",
      component: ThisPC,
      iconType: "gIcon",
      icon: "laptop_mac",
    },
    {
      id: 2,
      title: "Notes",
      component: Notes,
      iconType: "gIcon",
      icon: "book_2",
    },
    {
      id: 3,
      title: "CommonNet",
      component: Commonnet,
      iconType: "gIcon",
      icon: "mood"
    },
    {
      id: 4,
      title: "Example",
      component: Example, // Put the importing component name here
      iconType: "gIcon", //"gIcon" = Icon from google font for an app button
      icon: "home", //Google icon name (from google fonts)
    }
  ]);

  //Opened apps
  const [open, setOpen] = useState([]);

  //Dark mode / Light mode
  const [dark, setDark] = useState(true);
  const theme = lilumTheme(dark);

  const [clockBar, setClockBar] = useState(false);
  const [profileBar, setProfileBar] = useState(false);

  function openWindow(id) {
    const opened = open.find((e) => e.id === id);

    if (opened) {
      closeWindow(id);
      return;
    }

    setOpen((prev) => [
      ...prev,
      {
        id,
        z: prev.length + 1,
        x: prev.length * 20 + 100,
        y: prev.length * 20 + 100,
      },
    ]);
  }

  function closeWindow(id) {
  setOpen((prev) => prev.filter((e) => e.id !== id));
  }

  function focusWindow(id) {
    setOpen((prev) => {
      const maxZ = Math.max(0, ...prev.map((p) => p.z));
      return prev.map((p) => (p.id === id ? { ...p, z: maxZ + 1 } : p));
    });
  }

  const handleDrop = (e) => {
    const { active, delta } = e;

    setOpen((prev) =>
      prev.map((p) =>
        p.id === active.id ? { ...p, x: p.x + delta.x, y: p.y + delta.y } : p,
      ),
    );
  };

  function renderIcon(e) {
    switch (e.iconType) {
      case "gIcon":
      case "googleIcon":
      case "gi":
        return (
          <span className="material-symbols-outlined text-white text-4xl opacity-80" style={{fontSize: "48px"}}>{e.icon}</span>
        );
      case "img":
      case "image":
        return <img className="h-full w-full" src={e.icon} alt={e.title} />;
      default:
        return null;
    }
  }

  //Clock render

  const {hour, min, ampm} = useClock(12);

  return (
    
    <LilumThemeContext.Provider value={{ dark, setDark, theme }}>
      <div className="w-screen h-screen relative">
        {/* Menu bar */}
        <div
          className={`h-12 absolute z-1 flex items-center transition-colors left-1 right-1 top-1 rounded-lg backdrop-blur-[2px] border border-[#dbdbdb77]`}
          style={{
            backgroundColor: theme.bg,
            color: theme.text,
          }}
        >
          <button id="profile" className="h-full w-30 flex items-center cursor-pointer"  onClick={() => setProfileBar((prev) => !prev)}>
            <img
              src={profile.pfp}
              alt={profile.name}
              className="h-8 w-8 mx-2 rounded"
            />
            <p>{profile.name}</p>
          </button>
          <div
            id="tools"
            className="absolute right-3 poppins h-full flex gap-1 items-center"
          >
            <button
              className={`h-10 w-10 flex justify-center rounded-md items-center cursor-pointer ${dark ? "hover:bg-white/10" : "hover:bg-black/10"} transition transition-duration-[0.415s]`}
              onClick={() => {
                setDark((prev) => !prev);
              }}
            >
              <span className={`material-symbols-outlined opacity-[0.7] `}>
                {dark ? "sunny" : "dark_mode"}
              </span>
            </button>
            <div
              style={{ color: theme.text, fontWeight: "300" }}
              className="poppins relative h-full flex center"
            ><p>{hour}:{min} {" "} {ampm}</p>
             <button className={` w-full h-[80%] absolute  left-0 ${dark ? "hover:bg-white/10" : "hover:bg-black/10"} transition-colors rounded-lg cursor-pointer p-1`} 
             onClick={() => setClockBar((prev) => !prev)} ></button></div>
          </div>
        </div>
            
        {clockBar && <ClockBar/>}
        {profileBar && <ProfileBar profile={profile} setProfile={setProfile}/>}
      
        {/* Apps Pop-ups */}

        <div className="w-screen h-screen overflow-hidden relative">
          <DndContext
            onDragEnd={handleDrop}
            modifiers={[restrictToWindowEdges]}
          >
            {open.map((e) => {
              const currentApp = apps.find((a) => a.id === e.id);
              const AppComponent = currentApp.component;
              return (
                <div key={e.id} style={{ zIndex: e.z }}>
                  <AppComponent
                    onClose={() => closeWindow(e.id)}
                    focus={focusWindow}
                    id={e.id}
                    z={e.z}
                    x={e.x}
                    y={e.y}
                  />
                </div>
              );
            })}

            {/* Apps Button */} 
            <div
              className={`flex gap-5 transition-all m-2 absolute bottom-0 right-[50%] translate-x-1/2  p-2 rounded-lg border border-[#828282aa] backdrop-blur-[2px] scale-90`}
              style={{
                backgroundColor: theme.bg,
              }}
            >
              {apps.map((e) => {
                return (
                  <div
                    key={e.id}
                    className="flex flex-col center relative group transition"
                    style={{ color: "white" }}
                  >
                    <p
                      className="font-sans whitespace-nowrap leading-none mb-1 nunito transition  hidden group-hover:block "
                      style={{ textShadow: "1px 1px 1px #33333373" }}
                    >
                      {e.title}
                    </p>
                    <button
                      className="h-13 w-13 rounded-xl opacity-[0.95] overflow-hidden transition-transform hover:scale-105 flex justify-center items-center"
                      onClick={() => {
                        openWindow(e.id);
                      }}
                    >
                      {renderIcon(e)}
                    </button>
                  </div>
                );
              })} 
            </div>
          </DndContext>

          <img
            src="/Wallpapers/L-1.png"
            alt="wallpaper"
            className="absolute inset-0 -z-10 w-full h-full transition object-cover"
            style={{ filter: dark ? "brightness(75%)" : null }}
          />
          <div className="absolute inset-0 -z-99 w-full h-full" style={{backgroundColor: theme.bg}}></div>
        </div> 
      </div>
    </LilumThemeContext.Provider>
  );
};

export default Lilum;
