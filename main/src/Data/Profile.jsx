import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
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

  return (
    <ProfileContext.Provider value={{ profiles, setProfiles }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
