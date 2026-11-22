import React, { useRef, useState } from "react";
import PopUp from "../Component/Pop-up";
import { useLilumTheme } from "../Systems/Lilum/Theme";
import { useLilum } from "../Systems/Lilum/Kernel";
import { useGlobal } from "../Global";

const Notes = (props) => {
  const { storage, setStorage, currentPath, setCurrentPath } = useLilum();
  const { theme } = useLilumTheme();
  const { createFile } = useGlobal();
  const contentRef = useRef(null);

  const [note, setNote] = useState("");
  function onSave(thing) {
    console.log(contentRef.current.value);
    createFile(
      `Document-${Math.round(Math.random() * 6769)}.txt`,
      contentRef.current.innerHTML,
      storage,
      setStorage,
      ["Users", "Daisy", "Documents"], //Daisy Only work on LILUM OS
    );
  }

  return (
    <PopUp
      title="Notes"
      {...props}
      handleStyle={{
        backgroundColor: theme.bg || "White",
        color: theme.text || "Black",
      }}
    >
      <div
        className="w-full h-full overflow-hidden"
        style={{ color: theme.text, backgroundColor: theme.pri }}
      >
        {/* Tool Bar */}
        <div
          className="w-full h-7 flex gap-2"
          style={{ backgroundColor: theme.sec }}
        >
          <button
            className="mx-2 cursor-pointer poppins font-bold hover:underline"
            onClick={onSave}
          >
            Save
          </button>
        </div>
        <div
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setNote(e.currentTarget.innerHTML)}
          className="min-h-40 pb-3 pt-1  px-2 outline-none poppins"
          style={{ color: theme.text, backgroundColor: theme.pri }}
          ref={contentRef}
        >
          Hello! :3
        </div>
      </div>
    </PopUp>
  );
};

export default Notes;
