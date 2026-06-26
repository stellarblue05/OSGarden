import React, { useState } from "react";
import PopUp from "../Component/Pop-up";
import FileViewer from "./FileViewer";

import { components, useLilum } from "../Systems/Lilum/Kernel";
import { useGlobal } from "../Global";

const ThisPC = (props) => {
  const { storage, theme } = useLilum();
  const { getExtType, openWindow, open } = useGlobal();

  const [newDirName, setNewDirName] = useState("");

  const [pcPath, setPcPath] = useState(() =>
    storage?.children?.Users?.children?.Daisy
      ? ["Users", "Daisy"]
      : ["Users", "Anonymous"],
  );

  function getDir(path) {
    let dir = storage;

    for (const part of path) {
      dir = dir.children?.[part];
      if (!dir) return null;
    }

    return dir;
  }

  function isFolder(item) {
    return item?.type === "folder" || item?.type === "dir";
  }

  const pathText = pcPath.join("/");
  const currentDir = getDir(pcPath);
  const items = Object.entries(currentDir?.children || {});

  function createFolder(e) {
    e.preventDefault();

    let name = newDirName.trim();

    if (!name || !currentDir || currentDir.children?.[name]) return;

    const newStorage = structuredClone(storage);
    let dir = newStorage;

    for (const part of pcPath) {
      dir = dir.children[part];
    }

    name = name.replaceAll(" ", "_");

    dir.children[name] = {
      name,
      type: "folder",
      children: {},
    };

    setStorage(newStorage);
    setNewDirName("");
  }

  function openFolder(name, item) {
    if (!isFolder(item)) {
      return null;
    }
    setPcPath((prev) => [...prev, name]);
  }

  function onBack() {
    setPcPath((prev) => prev.slice(0, -1));
  }

  function onRoot() {
    setPcPath([]);
  }

  function openFile(name, item) {
    if (!item) return null;
    if (isFolder(item)) {
      openFolder(name, item);
      return null;
    }
    if (item.type === "app") {

    }

    let type = getExtType(item.ext, item.content)


    openWindow({
      id: `file-${name}`,
      title: name,
      component: "FileViewer",
      content: item.content,
      type
    });
  }

  return (
    <PopUp
      title="This PC"
      {...props}
      style={{ backgroundColor: theme.bg, backdropFilter: "blur(5px)" }}
      handleStyle={{ color: theme.text }}
      bodyStyle="scroll-thin lilum-scroll"
    >
      <div className="h-full p-2" style={{ color: theme.text }}>
        <div className="flex mb-2">
          <button className="mr-2" onClick={onBack}>
            Back
          </button>
          <button onClick={onRoot}>C:/</button>
          <p>{pathText}</p>
        </div>

        <form onSubmit={createFolder} className="flex gap-2 mb-3">
          <input
            value={newDirName}
            onChange={(e) => setNewDirName(e.target.value)}
            placeholder="New folder"
            className="bg-transparent outline-none rounded-lg border border-white/20 px-2"
            style={{ color: theme.text }}
            maxLength={50}
          />

          <button className="cursor-pointer">Create</button>
        </form>

        {!currentDir ? (
          <p>Folder not found</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {items.map(([name, item]) => (
              <button key={name} onClick={() => openFile(name, item)}>
                <span className="material-symbols-outlined">
                  {isFolder(item) ? "folder" : "description"}
                </span>

                <p>{item.name || name}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </PopUp>
  );
};

export default ThisPC;
