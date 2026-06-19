import React, { useState, useRef, useEffect } from "react";
import PopUp from "../../Component/Pop-up";
import { useLilumTheme } from "../../Systems/Lilum/Theme";
import { useLilumStorage } from "../../Data/Lilum/Storage";
import { runCommand } from "./Commands";

const Terminal = (props) => {
  const { theme } = useLilumTheme();
  const { storage, setStorage, currentPath, setCurrentPath } =
    useLilumStorage();

  const [history, setHistory] = useState([
    {
      type: "system",
      text: "Lilum CMD [Version 0.0.1]",
    },
    {
      type: "system",
      text: "Type 'help' to see available commands.",
    },
  ]);

  const [cmdInput, setCmdInput] = useState("");
  const inputRef = useRef(null);
  const currentPathText = "C:/" + currentPath.join("/");
  const bottomRef = useRef(null);

  const [prompt, setPrompt] = useState(currentPathText)

  const [terStyle, setTerStyle] = useState({
    backgroundColor: "",
    color: theme.text
  })


  useEffect(() => {
    inputRef.current?.focus();


  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  function onSubmit(e) {
    e.preventDefault();

    //Clear
    if (cmdInput.trim().toLowerCase() === "clear" || cmdInput.trim().toLowerCase() === "clr"   ) {
      setHistory([]);
      setCmdInput("");
      return;
    }



    const pathBeforeCmd = currentPathText;

    const output = runCommand({
      cmdInput,
      storage,   
      setStorage,
      currentPath,
      setCurrentPath,
      setPrompt,
      setTerStyle
    });

        setHistory((prev) => [
      ...prev,
      {
        type: "input",
        path: pathBeforeCmd,
        text: cmdInput,
      },
      ...(output
        ? [
            {
              type: "output",
              text: output,
            },
          ]
        : []),
    ]);

    setCmdInput("");
  }


  return (
    <PopUp
      title="Terminal"
      {...props}        
      style={{ backgroundColor: theme.bg, backdropFilter: "blur(5px)"}}
      handleStyle={{ color: theme.text }}
      bodyStyle={`scroll-thin lilum-scroll  `}
      XStyle={{}} /* The X button style */
      fullStyle={{}} /* The full button style */
      mainStyle={{...terStyle}}
    >
      <div
        className={`inset-0 relative jetbrains p-1 text-sm `} 
        style={{ lineHeight: "1.2em" }}
        onClick={() => inputRef.current?.focus()}
      >
        <form onSubmit={onSubmit}>
          {history.map((cmd, index) => (
            
            <p key={index} style={{marginBottom: cmd.type === "output" ? "7px" : "0" }}>
              {cmd.type === "input" ? `${prompt}> ${cmd.text}` : cmd.text}
            </p>
          ))}

          <span>{prompt}&gt;</span>

          <input
            value={cmdInput}
            ref={inputRef}
            className="outline-none ml-1 flex-1"
            onChange={(e) => setCmdInput(e.target.value)}
          />
        </form>

        <div ref={bottomRef} />
      </div>
    </PopUp>
  );
};

export default Terminal;
