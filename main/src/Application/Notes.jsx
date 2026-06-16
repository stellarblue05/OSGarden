import React from "react";
import PopUp from "../Component/Pop-up";
import { useLilumTheme } from "../Systems/Lilum/Theme";

const Notes = (props) => {
  const { theme } = useLilumTheme();

  return (
    <PopUp
      title="Notes"
      {...props}
      handleStyle={{
        backgroundColor: theme.bg || "White",
        color: theme.text || "Black",
      }}
    >
      <div className="w-full h-full overflow-hidden">
        <textarea
          name="Notes"
          id="1"
          className="resize-none w-full h-full  outline-none"
          style={{ color: theme.text, backgroundColor: theme.pri}}
        ></textarea>
      </div>
    </PopUp>
  );
};

export default Notes;
