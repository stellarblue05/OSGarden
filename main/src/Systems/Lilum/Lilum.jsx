import React from "react";
import { DndContext } from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import { LilumThemeContext } from "./Theme.jsx";
import { useProfile } from "../../Data/Profile.jsx";
import { useLilum, components } from "./Kernel.jsx";

import ClockBar from "./ClockBar.jsx";
import ProfileBar from "./ProfileBar.jsx";
import { useClock } from "../../Component/Clock.jsx";

const Lilum = () => {
  //Import everything from kernel
  const {
    storage,
    dark,
    setDark,
    theme,
    open,
    clockBar,
    setClockBar,
    profileBar,
    setProfileBar,
    openWindow,
    closeWindow,
    focusWindow,
    handleDrop,
  } = useLilum();

  //Find apps in desktop storage
  const apps = Object.entries(
    storage.children.Users.children.Daisy.children.Desktop.children || {},
  ).map(([key, value]) => ({ key, ...value }));

  //Get "Daisy" profile
  const { profiles, setProfiles } = useProfile();
  const profile = profiles.lilum;
  function setProfile(e) {
    setProfiles((prev) => ({
      ...prev,
      lilum: typeof e === "function" ? e(prev.lilum) : e,
    }));
  }

  //Render apps icon
  function renderIcon(e) {
    switch (e.iconType) {
      case "gIcon":
      case "googleIcon":
      case "gi":
        return (
          <span
            className="material-symbols-outlined text-white text-4xl opacity-80"
            style={{ fontSize: "48px" }}
          >
            {e.icon}
          </span>
        );
      case "img":
      case "image":
        return <img className="h-full w-full" src={e.icon} alt={e.title} />;
      default:
        return null;
    }
  }

  //import AM,PM clock
  const { hour, min, ampm } = useClock(12);

  return (
    <LilumThemeContext.Provider value={{ dark, setDark, theme }}>
      <div className="w-screen h-screen relative">
        {/* Menu bar */}
        <div
          className="h-12 absolute z-1 flex items-center transition-colors left-1 right-1 top-1 rounded-lg backdrop-blur-[2px] border border-[#dbdbdb77]"
          style={{ backgroundColor: theme.bg, color: theme.text }}
        >
          <button
            id="profile"
            className="h-full w-30 flex items-center cursor-pointer"
            onClick={() => setProfileBar((prev) => !prev)}
          >
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
              onClick={() => setDark((prev) => !prev)}
            >
              <span className="material-symbols-outlined opacity-[0.7]">
                {dark ? "sunny" : "dark_mode"}
              </span>
            </button>
            <div
              style={{ color: theme.text, fontWeight: "300" }}
              className="poppins relative h-full flex center"
            >
              <p>
                {hour}:{min} {ampm}
              </p>
              <button
                className={`w-full h-[80%] absolute left-0 ${dark ? "hover:bg-white/10" : "hover:bg-black/10"} transition-colors rounded-lg cursor-pointer p-1`}
                onClick={() => setClockBar((prev) => !prev)}
              />
            </div>
          </div>
        </div>

        {clockBar && <ClockBar />}
        {profileBar && <ProfileBar profile={profile} setProfile={setProfile} />}

        {/* Apps */}
        <div className="w-screen h-screen overflow-hidden relative">
          <DndContext
            onDragEnd={handleDrop}
            modifiers={[restrictToWindowEdges]}
          >
            {open.map((e) => {
              const AppComponent = components[e.component];

              if (!AppComponent) return null;

              const { key, ...item } = e;

              return (
                <div key={key || e.id} style={{ zIndex: e.z }}>
                  <AppComponent
                    {...item}
                    onClose={() => closeWindow(e.id)}
                    focus={focusWindow}
                  />
                </div>
              );
            })}

            {/* Dock */}
            <div
              className="flex gap-5 transition-all m-2 absolute bottom-0 right-[50%] translate-x-1/2 p-2 rounded-lg border border-[#828282aa] backdrop-blur-[2px] scale-90"
              style={{ backgroundColor: theme.bg }}
            >
              {apps.map((e) => (
                <div
                  key={e.id}
                  className="flex flex-col center relative group transition"
                  style={{ color: "white" }}
                >
                  <p
                    className="font-sans whitespace-nowrap leading-none mb-1 nunito transition hidden group-hover:block"
                    style={{ textShadow: "1px 1px 1px #33333373" }}
                  >
                    {e.title}
                  </p>
                  <button
                    className="h-13 w-13 rounded-xl opacity-[0.95] overflow-hidden transition-transform hover:scale-105 flex justify-center items-center"
                    onClick={() => openWindow(e)}
                  >
                    {renderIcon(e)}
                  </button>
                </div>
              ))}
            </div>
          </DndContext>

          <img
            src="/Wallpapers/L-1.png"
            alt="wallpaper"
            className="absolute inset-0 -z-10 w-full h-full transition object-cover"
            style={{ filter: dark ? "brightness(75%)" : null }}
          />
          <div
            className="absolute inset-0 -z-99 w-full h-full"
            style={{ backgroundColor: theme.bg }}
          />
        </div>
      </div>
    </LilumThemeContext.Provider>
  );
};

export default Lilum;
