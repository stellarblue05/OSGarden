import { createContext, useContext, useState } from "react";
import lilumTheme from "./Theme";

//IMPORT APP IN LILUM OS HERE
import Notes from "../../Application/Notes.jsx";
import ThisPC from "../../Application/ThisPC.jsx";
import Commonnet from "../../Application/Commonnet/Commonnet.jsx";
import Example from "../../Application/EXAMPLE.jsx";
import Terminal from "../../Application/Terminal/Terminal.jsx";
import Settings from "../../Application/Settings.jsx";

import FileViewer from "../../Application/FileViewer.jsx";
import Wallpaper from "./Wallpaper.js";
export const components = {
  ThisPC,
  Notes,
  Settings,
  Commonnet,
  Example,
  Terminal,
  FileViewer,
};

const LilumContext = createContext();

const initialStorage = {
  name: "Root",
  type: "folder",
  children: {
    Users: {
      name: "Users",
      type: "folder",
      children: {
        Daisy: {
          name: "Daisy",
          type: "folder",
          children: {
            Desktop: {
              name: "Desktop",
              type: "folder",
              children: {
                explorer: {
                  id: 1,
                  title: "This PC",
                  component: "ThisPC",
                  iconType: "gIcon",
                  icon: "laptop_mac",
                  type: "app",
                },
                settings: {
                  id: 6,
                  title: "Settings",
                  component: "Settings",
                  iconType: "gIcon",
                  icon: "settings",
                  type: "app",
                },
                notes: {
                  id: 2,
                  title: "Notes",
                  component: "Notes",
                  iconType: "gIcon",
                  icon: "book_2",
                  type: "app",
                },
                commonnet: {
                  id: 3,
                  title: "CommonNet",
                  component: "Commonnet",
                  iconType: "gIcon",
                  icon: "mood",
                  type: "app",
                },
                example: {
                  id: 4,
                  title: "Example",
                  component: "Example", // Put the importing component name here
                  iconType: "gIcon", //"gIcon" = Icon from google font for an app button
                  icon: "home", //Google icon name (from google fonts)
                  type: "app",
                },
                cmd: {
                  id: 5,
                  title: "Terminal",
                  component: "Terminal",
                  iconType: "gIcon",
                  icon: "code",
                  type: "app",
                },
              },
            },
            Documents: {
              name: "Documents",
              type: "folder",
              children: {
                "Text.txt": {
                  name: "Text.txt",
                  ext: "txt",
                  type: "file",
                  content: "Lorem Ipsum umor si amet",
                },
              },
            },
          },
        },
      },
    },
  },
};

export function LilumProvider({ children }) {
  //Storage

  const [storage, setStorage] = useState(initialStorage);
  const [currentPath, setCurrentPath] = useState(["Users", "Daisy"]);

  //Theme
  const [dark, setDark] = useState(true);
  const [themeStyle, setThemeStyle] = useState(1);
  const theme = lilumTheme(dark, themeStyle);
  const themeShowcase = [
    {
      id: 1,
      name: "Lilium",
      image: `${import.meta.env.BASE_URL}showcase/Lilium.png`,
    },
    {
      id: 2,
      name: "Blue Pastel",
      image: `${import.meta.env.BASE_URL}showcase/blluePastel.png`,
    },
    {
      id: 3,
      name: "Catppuccin",
      image: `${import.meta.env.BASE_URL}showcase/catppushin.png`,
    },
    {
      id: 4,
      name: "Commonnet",
      image: `${import.meta.env.BASE_URL}showcase/commonnet.png`,
    },
  ];

  const [wallpaperId, setWallpaper] = useState(1);

  const wallpaper =
    typeof wallpaperId === "object" ? wallpaperId : Wallpaper(wallpaperId);

  const wallpaperList = Wallpaper(null, false, true);
  //Pop-ups
  const [clockBar, setClockBar] = useState(false);
  const [profileBar, setProfileBar] = useState(false);

  return (
    <LilumContext.Provider
      value={{
        // Storage
        storage,
        setStorage,
        currentPath,
        setCurrentPath,
        // Theme
        dark,
        setDark,

        themeStyle,
        setThemeStyle,

        themeShowcase,

        wallpaper,
        wallpaperList,

        wallpaperId,
        setWallpaper,

        //Change theme func
        theme,
        // Windows
        clockBar,
        setClockBar,
        profileBar,
        setProfileBar,
      }}
    >
      {children}
    </LilumContext.Provider>
  );
}

export function useLilum() {
  return useContext(LilumContext);
}
