import React from "react";
import PopUp from "../Component/Pop-up";
import { useLilumTheme } from "../Systems/Lilum/Theme";
import { useLilum } from "../Systems/Lilum/Kernel";

const Settings = (props) => {
  const { theme } = useLilumTheme();
  const { themeStyle, setThemeStyle, dark, setDark, getTheme } = useLilum();
  //The object sent to Pop-up is optional Execpt {...props}
  return (
    <PopUp
      title="Settings"
      {...props}
      handleStyle={{
        backgroundColor: theme.sec || "White",
        color: theme.text || "Black",
      }}
      XStyle={{}} /* The X button style */
      fullStyle={{}} /* The full button style */
    >
      <div
        className="h-full p-1"
        style={{ color: theme.text, backgroundColor: theme.bg }}
      >
        <div className="flex flex-col">
          <p className="poppins">Theme:</p>
          <div className="flex">
            <button>1</button>
            <button>2</button>
          </div>
        </div>
      </div>
    </PopUp>
  );
};

export default Settings;
