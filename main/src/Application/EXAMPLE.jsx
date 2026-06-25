import React from "react";
import PopUp from "../Component/Pop-up";
import { useLilumTheme } from "../Systems/Lilum/Theme";

const Example = (props) => {
  const { theme } = useLilumTheme();
  //The object sent to Pop-up is optional Execpt {...props}
  return (
    <PopUp
      title="Name"
      {...props}
      style={{ backgroundColor: theme.bg,color: theme.text, backdropFilter: "blur(5px)" }}

      handleStyle={{ color: theme.text }}

      bodyStyle="scroll-thin lilum-scroll \\in tailwind "

      XStyle={{}} /* The X button style */

      fullStyle={{}} /* The full button style */
    >
          {/* Content here */}
          Hello World
    </PopUp>
  );
};

export default Example;
