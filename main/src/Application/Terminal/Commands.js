function getDir(storage, currentPath) {
  let dir = storage;

  for (const part of currentPath) {
    dir = dir.children?.[part];

    if (!dir) return null;
  }

  return dir;
}



export function runCommand({
  cmdInput,
  storage,
  setStorage,
  currentPath,
  setCurrentPath,
}) {
  const parts = cmdInput.trim().split(" ");
  const command = parts[0];
  const target = parts[1];


  switch (command) {
    case "help":
      return "Commands: help, clear, pwd, ls, cd, mkdir";

    case "pwd":
      return "C:/" + currentPath.join("/");

    case "ls": {
      const dir = getDir(storage, currentPath);

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

      const dir = getDir(storage, currentPath);
      const next = dir?.children?.[target];

      if (!next) return `cd: ${target}: Not found`;
      if (next.type !== "folder") return `cd: ${target}: not a folder`;

      setCurrentPath((prev) => [...prev, target]);
      return "";
    }
    case "mkdir": {
      if (!target) return "mkdir: missing folder name";

      const dir = getDir(storage, currentPath);

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
    case "echo":
        return target

    default:
      return `${command}: command not found`;
  }
}