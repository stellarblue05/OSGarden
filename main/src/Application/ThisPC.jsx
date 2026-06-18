import React from "react";
import PopUp from "../Component/Pop-up";
import { useLilumTheme } from "../Systems/Lilum/Theme";
import { useLilumStorage } from "../Data/Lilum/Storage";

const ThisPC = (props) => {
  const { theme } = useLilumTheme();
  const {storage, setStorage, currentPath, setCurrentPath} = useLilumStorage()
  return (
    <PopUp
      title="This PC"
      {...props}
      style={{ backgroundColor: theme.bg, backdropFilter: "blur(5px)"}}
      handleStyle={{ color: theme.text }}
      bodyStyle="scroll-thin lilum-scroll"
    >
      <hr style={{ color: theme.text }} />
      <div className="w-full flex flex-warp">
          
      </div>
    </PopUp>
  );
};

export default ThisPC;
