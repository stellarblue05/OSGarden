import React from "react";
import PopUp from "../Component/Pop-up";
import { useLilumTheme } from "../Systems/Lilum/Theme";
import { useLilum } from "../Systems/Lilum/Kernel";
import { useGlobal } from "../Global";

const Settings = (props) => {
  const { theme } = useLilumTheme();
  const {
    themeStyle,
    setThemeStyle,
    themeShowcase,
    dark,
    setDark,
    wallpaper,
    wallpaperId,
    setWallpaper,
    wallpaperList,
  } = useLilum();
  const { handleUserImageUpload } = useGlobal();
  console.log(wallpaperList);
  //The object sent to Pop-up is optional Execpt {...props}
  return (
    <PopUp
      title="Settings"
      {...props}
      style={{
        backgroundColor: `color-mix(in srgb, ${theme.sec} 60%, transparent)`,
        color: theme.text,
        backdropFilter: " blur(30px)  saturate(115%)  brightness(100%)",
      }}
      handleStyle={{ color: theme.text }}
      bodyStyle="scroll-thin lilum-scroll"
    >
      <div className="h-full p-1 poppins" style={{ color: theme.text }}>
        <div className="flex flex-col">
          <div className="flex gap-1 [&>div]:rounded-full [&>div]:h-5 [&>div]:w-5">
            <div style={{ backgroundColor: theme.pri }}></div>
            <div style={{ backgroundColor: theme.sec }}></div>
            <div style={{ backgroundColor: theme.fbg }}></div>
            <div style={{ backgroundColor: theme.text }}></div>
            <div style={{ backgroundColor: theme.color }}></div>{" "}
          </div>
          <p className="poppins font-bold">Theme:</p>
          <div className="w-full overflow-x-auto ">
            <div className="flex gap-3 w-max p-2">
              {themeShowcase.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setThemeStyle(item.id)}
                  style={{
                    borderColor:
                      themeStyle === item.id ? theme.color : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (themeStyle !== item.id)
                      e.currentTarget.style.borderColor = `${theme.color}80`;
                  }}
                  onMouseLeave={(e) => {
                    if (themeStyle !== item.id)
                      e.currentTarget.style.borderColor = "transparent";
                  }}
                  className={`
          relative w-40 h-24 group overflow-hidden rounded-lg
          border-2 transition-all duration-175 hover:scale-105
        `}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />

                  <span
                    className="   opacity-0 translate-y-3
      group-hover:opacity-100
      group-hover:translate-y-0
      transition-all duration-255 ease-in-out absolute bottom-0 inset-x-0 bg-black/13 backdrop-blur-xl backdrop-saturate-150 text-white text-xs p-2 text-left"
                  >
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <p>
            <b>Mode:</b>
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setDark(false)}
              style={{
                borderColor: !theme.dark ? theme.color : "transparent",
              }}
              onMouseEnter={(e) => {
                if (theme.dark)
                  e.currentTarget.style.borderColor = `${theme.color}80`;
                e.currentTarget.style.backgroundColor = `${theme.color}AA`;
              }}
              onMouseLeave={(e) => {
                if (theme.dark)
                  e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              className="h-8 w-23 border rounded transition-all duration-175 hover:scale-105"
            >
              Light
            </button>
            <button
              onClick={() => setDark(true)}
              style={{
                borderColor: theme.dark ? theme.color : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!theme.dark)
                  e.currentTarget.style.borderColor = `${theme.color}80`;
                e.currentTarget.style.backgroundColor = `${theme.color}AA`;
              }}
              onMouseLeave={(e) => {
                if (!theme.dark)
                  e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              className="h-8 w-23 border rounded transition-all duration-175 hover:scale-105"
            >
              Dark
            </button>
          </div>
          <p className="font-bold">Wallpapers:</p>
          <div className="max-h-64 overflow-y-hidden overflow-x-auto lilum-scroll grid grid-flow-col grid-rows-2 auto-cols-[160px] gap-3 p-2">
            {wallpaperList.map((e) => {
              return (
                <div
                  key={e.id}
                  onClick={() => setWallpaper(e.id)}
                  className="group cursor-pointer border-2 relative border border-[px] w-40 mb-2 ml-2 h-24 flex center  rounded overflow-hidden  transition-all duration-175 hover:scale-105"
                  style={{
                    borderColor:
                      wallpaperId === e.id ? theme.color : "transparent",
                  }}
                  onMouseEnter={(a) => {
                    if (wallpaperId !== e.id)
                      a.currentTarget.style.borderColor = `${theme.color}80`;
                  }}
                  onMouseLeave={(a) => {
                    if (wallpaperId !== e.id)
                      a.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  <img
                    src={
                      e.image.startsWith("data:")
                        ? e.image
                        : `${import.meta.env.BASE_URL}${e.image}`
                    }
                    className="inset-0 w-full h-full object-cover absolute"
                  />
                  <span
                    className="   opacity-0 translate-y-3
      group-hover:opacity-100
      group-hover:translate-y-0
      transition-all duration-255 ease-in-out absolute bottom-0 inset-x-0 bg-black/13 backdrop-blur-xl backdrop-saturate-150 text-white text-xs p-2 text-left"
                  >
                    {e.name}
                  </span>
                </div>
              );
            })}

            <div className="cursor-pointer relative border border-[px] w-40 mb-2 ml-2 h-24 flex center border-dashed rounded  transition-all duration-175 hover:scale-105">
              <span className="material-symbols-outlined">wallpaper</span>
              <p className="text-sm font-medium">Your wallpaper</p>
              <input
                className="absolute  w-full h-full opacity-0 bg-red-400 cursor-pointer"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleUserImageUpload(e, (image) => {
                    setWallpaper({
                      id: 0,
                      custom: true,
                      image: image,
                    });
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </PopUp>
  );
};

export default Settings;
