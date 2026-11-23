import React from "react";
import PopUp from "../Component/Pop-up";
import { useLilumTheme } from "../Systems/Lilum/Theme";
import { useLilum } from "../Systems/Lilum/Kernel";
import { useGlobal } from "../Global";

const Settings = (props) => {
  const { theme } = useLilumTheme();
  const { themeStyle, setThemeStyle, dark, setDark, wallpaper, setWallpaper } =
    useLilum();
  const { handleUserImageUpload } = useGlobal();
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
          <p className="poppins font-bold">Theme:</p>
          <div className="grid grid-cols-2 w-full gap-2">
            <button onClick={() => setThemeStyle(1)}>
              <img
                src={`${import.meta.env.BASE_URL}showcase/Lilium.png`}
                alt=""
                className="w-full h-full object-cover rounded "
              />
            </button>

            <button onClick={() => setThemeStyle(2)}>
              <img
                src={`${import.meta.env.BASE_URL}showcase/blluePastel.png`}
                alt=""
                className="w-full h-full object-cover rounded"
              />
            </button>

            <button onClick={() => setThemeStyle(3)}>
              <img
                src={`${import.meta.env.BASE_URL}showcase/catppushin.png`}
                alt=""
                className="w-full h-full object-cover rounded"
              />
            </button>

            <button onClick={() => setThemeStyle(4)}>
              <img
                src={`${import.meta.env.BASE_URL}showcase/commonnet.png`}
                alt=""
                className="w-full h-full object-cover rounded"
              />
            </button>
          </div>
          <p>
            <b>Mode:</b>
          </p>
          <div className="flex">
            <button onClick={() => setDark(false)}>Light</button>
            <button onClick={() => setDark(true)}>Dark</button>
          </div>
          <p className="font-bold">Wallpapers:</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleUserImageUpload(e, (image) => {
                setWallpaper(image);
              })
            }
          />
        </div>
      </div>
    </PopUp>
  );
};

export default Settings;
