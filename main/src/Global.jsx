import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [open, setOpen] = useState([]);

  //Look at files
  function getExtType(ext, content) {
    let type;

    switch (ext) {
      case "txt":
        type = "text";
        break;
      case "png":
        type = "img";
        break;
      case "":
      default:
        type = content ? "data" : "empty";
    }

    return type;
  }

  function getFileType(ext, content) {
    ext = String(ext || "").toLowerCase();

    if (!content) return "empty";

    switch (ext) {
      case "":
      case "txt":
        if (/[^\x00-\x7f]/.test(content)) {
          return "Unicode text, UTF-8 text";
        }

        return "ASCII text";

      case "png":
        return "PNG image data, 8-bit/color RGB";

      case "jpg":
      case "jpeg":
        return "JPEG image data";

      default:
        return "data";
    }
  }

  function openWindow(app) {
    const opened = open.find((e) => e.id === app.id);

    if (opened) {
      focusWindow(app.id);
      return;
    }

    setOpen((prev) => {
      const nextZ = Math.max(0, ...prev.map((p) => p.z || 0)) + 1;

      return [
        ...prev,
        {
          ...app,
          id: app.id,
          z: nextZ,
          x: prev.length * 20 + 100,
          y: prev.length * 20 + 100,
        },
      ];
    });
  }

  function closeWindow(id) {
    setOpen((prev) => prev.filter((e) => e.id !== id));
  }

  function focusWindow(id) {
    setOpen((prev) => {
      const maxZ = Math.max(0, ...prev.map((p) => Number(p.z) || 0));
      return prev.map((p) => (p.id === id ? { ...p, z: maxZ + 1 } : p));
    });
  }

  function handleDrop({ active, delta }) {
    setOpen((prev) =>
      prev.map((p) =>
        String(p.id) === String(active.id) // ← safe regardless of type
          ? { ...p, x: p.x + delta.x, y: p.y + delta.y }
          : p,
      ),
    );
  }

  function createFile(name, content = "", storage, setStorage, currentPath) {
    name = name.trim();
    if (!name) return "missing file name";

    const forbidden = ["<", ">", ":", '"', "/", "\\", "|", "?", "*"];

    if (forbidden.some((char) => name.includes(char))) {
      return "filename contains invalid characters";
    }

    const parts = name.split(".");
    const ext = parts.length > 1 ? parts.pop().toLowerCase() : "";
    const fileName = parts.length ? parts.join(".") : name;

    const kind = getExtType(ext, content);

    const newStorage = structuredClone(storage);
    let newFile = newStorage;

    for (const part of currentPath) {
      if (!newFile.children?.[part]) {
        return "Folder not found";
      }
      newFile = newFile.children[part];
    }

    if (newFile.children?.[name]) {
      return `${name}: already exists`;
    }

    newFile.children[name] = {
      ext,
      name: `${fileName}${ext ? "." : ""}${ext}`,
      type: "file",
      kind,
      content,
    };

    setStorage(newStorage);
    return true;
  }

  return (
    <GlobalContext.Provider
      value={{
        getExtType,
        open,
        setOpen,
        getFileType,
        openWindow,
        closeWindow,
        focusWindow,
        handleDrop,
        createFile,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
