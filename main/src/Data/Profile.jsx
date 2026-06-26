import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {

  //Users Profiles
  const [profiles, setProfiles] = useState({
    lilum: {
      pfp: "/pfp/C-1.png",
      username: "Daisy1280",
      name: "Daisy",
      device: "Ampro Pad 12",
      email: "Daisy1280@Promail.com",
      bio: "Getting bored today.",
      location: "Earth, Virgo Supercluster",
      cn: {
        pfp: "/pfp/C-1.png",
        username: "Adarkmage",
        name: "notDaisy",
        bio: "I am fish ~>(  ')",
        fer: 0,
        ing: 0,
        t: "2019-06-12T14:04:24",
        ty: "self",
        col: "#F7CAC9",
        posts: []
      }
    },
  });
  
  //Get file types
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

  

  return (
    <ProfileContext.Provider value={{ profiles, setProfiles }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
