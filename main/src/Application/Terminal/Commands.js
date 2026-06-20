export function runCommand({
  cmdInput,
  storage,
  setStorage,
  currentPath,
  setCurrentPath,
  setPrompt,
  setTerStyle,
}) {
  const parts = cmdInput.trim().split(" ");
  const command = parts[0].toLowerCase();
  const target = parts[1];

  function getDir() {
    let dir = storage;

    for (const part of currentPath) {
      dir = dir.children?.[part];

      if (!dir) return null;
    }

    return dir;
  }

  function createFile(name, content) {
    name = name.trim();
    if (!name) return "missing file name";

    const dir = getDir();

    if (!dir) return "Folder not found";
    if (dir.children?.[name]) return `${name}: already exists`;

    const forbidden = ["<", ">", ":", '"', "/", "\\", "|", "?", "*"];

    if (forbidden.some((char) => name.includes(char))) {
      return "filename contain invalid characters";
    }

    const parts = name.split(".");

    const ext = parts.length > 1 ? parts.pop() : "";

    const fileName = parts.length ? parts.join(".") : name;

    const type = getExtType(ext, content);

    const newStorage = structuredClone(storage);
    let newFile = newStorage;

    for (const part of currentPath) {
      newFile = newFile.children[part];
    }

    newFile.children[target] = {
      baseName: fileName,
      ext,
      name: `${fileName}.${ext}`,
      type,
      content,
    };

    setStorage(newStorage);
    return true;
  }

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

  function getContentType(content) {
    if (!content) return "empty";

    const localPathRegex = /^(\.\/|\.\.\/|\/)[^?\s]+\.[a-zA-Z0-9]+$/;

    if (typeof content === "string" && localPathRegex.test(content)) {
      return "image data, 8-bit/color RGB";
    }
    if (/[^\x00-\x7f]/.test(content)) {
      return "Unicode text, UTF-8 text";
    }
    if (!/[^\x00-\x7f]/.test(content)) {
      return "ASCII text";
    } else {
      return "data";
    }

    return "";
  }

  function getColor(hex) {
    hex = String(hex).toUpperCase();
    switch (String(hex).toUpperCase()) {
      case "0":
        return "#000000"; // Black
      case "1":
        return "#000080"; // Blue
      case "2":
        return "#008000"; // Green
      case "3":
        return "#008080"; // Aqua (Cyan)
      case "4":
        return "#800000"; // Red
      case "5":
        return "#800080"; // Purple (Magenta)
      case "6":
        return "#808000"; // Yellow
      case "7":
        return "#C0C0C0"; // White

      case "8":
        return "#808080"; // Gray
      case "9":
        return "#0000FF"; // Light Blue
      case "A":
        return "#00FF00"; // Light Green
      case "B":
        return "#00FFFF"; // Light Aqua
      case "C":
        return "#FF0000"; // Light Red
      case "D":
        return "#FF00FF"; // Light Purple
      case "E":
        return "#FFFF00"; // Light Yellow
      case "F":
        return "#FFFFFF"; // Bright White

      default:
        return null;
    }
  }

  switch (command) {
    case "":
      return "";
    case "help":
      return "Commands: help, clear, pwd, ls, cd, mkdir";

    case "pwd":
      return "C:/" + currentPath.join("/");

    case "ls": {
      const dir = getDir();

      if (!dir) return "Folder not found";

      const names = Object.keys(dir.children || {});

      return names.length ? names.join("  ") : "Empty folder";
    }

    case "cd": {
      if (!target) return "cd: missing folder name";

      switch (target) {
        case "/":
          setCurrentPath([]);
          return "";

        case "..":
          setCurrentPath((prev) => prev.slice(0, -1));
          return "";

        default:
          break;
      }

      const dir = getDir();
      const next = dir?.children?.[target];

      if (!next) return `cd: ${target}: Not found`;
      if (next.type !== "folder") return `cd: ${target}: not a folder`;

      setCurrentPath((prev) => [...prev, target]);
      return "";
    }
    case "mkdir": {
      if (!target) return "mkdir: missing folder name";

      const dir = getDir();

      if (!dir) return "Folder not found";
      if (dir.children?.[target]) return `mkdir: ${target}: already exists`;

      const newStorage = structuredClone(storage);
      let newDir = newStorage;

      for (const part of currentPath) {
        newDir = newDir.children[part];
      }

      newDir.children[target] = {
        name: target,
        type: "folder",
        children: {},
      };

      setStorage(newStorage);
      return "";
    }
    case "rmdir": {
      if (!target) return "rmdir: missing folder name";

      const dir = getDir();

      if (!dir) return "Folder not found";
      if (!dir.children?.[target]) return `rmdir: ${target}: not found`;
      if (dir.children[target].type !== "folder")
        return `rmdir: ${target}: not a folder`;

      const newStorage = structuredClone(storage);
      let newDir = newStorage;

      for (const part of currentPath) {
        newDir = newDir.children[part];
      }

      if (Object.keys(newDir.children[target].children).length > 0) {
        return `rmdir: ${target}: folder not empty`;
      }

      delete newDir.children[target];

      setStorage(newStorage);
      return "";
    }

    case "file": {
      if (!target) return "file: missing file name";

      const dir = getDir();
      if (!dir) return "file: file not found";
      if (!dir.children?.[target]) return `file: ${target} not found`;

      const content = dir.children?.content;

      const type = getContentType(content);
      return `${target}: ${type}`;
    }

    case "echo": {
      const [command, ...args] = cmdInput.trim().split(/\s+/);
      const target = args.join(" ");

      const Tparts = target.trim().split(">");
      if (Tparts.length <= 1) return target;
      if (Tparts.length >= 3) return "Multiple oparation not supported (yet)";
      const word = Tparts[0].trim();
      const file = Tparts[1].trim();

      const e = createFile(file, word);

      return e ? "" : e;
    }
    case "prompt": {
      const [command, ...args] = cmdInput.trim().split(/\s+/);
      const target = args.join(" ");
      setPrompt(target);
      return true;
    }
    case "color": {
      let e;

      if (target.length > 2 || !target) {
        e = `Color: Invalid target     
    0 = Black       8 = Gray
    1 = Blue        9 = Light Blue
    2 = Green       A = Light Green
    3 = Aqua        B = Light Aqua
    4 = Red         C = Light Red
    5 = Purple      D = Light Purple
    6 = Yellow      E = Light Yellow
    7 = White       F = Bright White
    color [background][text]`;
      } else if (target.length === 1) {
        let color = getColor(target) || null;
        if (!color) return "color: invalid color";
        setTerStyle((prev) => ({
          ...prev,
          color,
        }));
        return true;
      } else if (target.length === 2) {
        const split = target.split("");
        const bg = split[0];
        const txt = split[1];

        let bgCol = getColor(bg) || null;
        let txtCol = getColor(txt) || null;
        if (!bgCol || !txtCol) return "color: Invalid color";
        setTerStyle((prev) => ({
          ...prev,
          color: txtCol,
          backgroundColor: bgCol, 
        }));
      }

      return e || true;
    }
    default:
      return `${command}: command not found`;
  }
}
