import React from "react";
import PopUp from "../Component/Pop-up";
import { useLilumTheme } from "../Systems/Lilum/Theme";

const ThisPC = (props) => {
  const { theme } = useLilumTheme();
  return (
    <PopUp
      title="This PC"
      {...props}
      style={{ backgroundColor: theme.bg, backdropFilter: "blur(5px)"}}
      handleStyle={{ color: theme.text }}
      bodyStyle="scroll-thin lilum-scroll"
    >
      <hr style={{ color: theme.text }} />
      <div className="w-full flex flex-warp m-3">
          
      </div>
    </PopUp>
  );
};

export default ThisPC;
