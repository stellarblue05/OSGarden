import { createContext, useContext, useState } from "react";

const LilumStorageContext = createContext();

const initialStorage = {
  name: "Root",
  type: "folder",
  children: {
    Users: {
      name: "Users",
      type: "folder",
      children: {
        Daisy: {
          name: "Daisy",
          type: "folder",
          children: {
            Desktop: {
              name: "Desktop",
              type: "folder",
              children: {},
            },
            Documents: {
              name: "Documents",
              type: "folder",
              children: {
                Text: {
                  name: "Text.txt",
                  type: "text",
                  content: "Lorem Ipsum umor si amet",
                },
              },
            },
          },
        },
      },
    },
  },
};

export function LilumStorageProvider({ children }) {
  const [storage, setStorage] = useState(initialStorage);
  const [currentPath, setCurrentPath] = useState(["Users", "Daisy"]);

  return (
    <LilumStorageContext.Provider
      value={{ storage, setStorage, currentPath, setCurrentPath }}
    >
      {children}
    </LilumStorageContext.Provider>
  );
}

export function useLilumStorage() {
  return useContext(LilumStorageContext);
}
