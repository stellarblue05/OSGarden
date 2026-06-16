import React from "react";
import { useLilumTheme } from "./Theme";

const ProfileBar = ({ profile, setProfile }) => {
  const { theme } = useLilumTheme();
  return (
    <div
      className=" w-48 h-[80%] absolute left-1  top-16 flex flex-col items-center rounded-lg rounded-lg backdrop-blur-[2px] border border-[#dbdbdb77]"
      style={{ backgroundColor: theme.bg }}
    >
      <div className="relative w-full">
        <button className="h-8 w-8 absolute right-1 top-1 z-3 rounded-full" style={{backgroundColor: theme.panel, boxShadow: "1px 1px 3px -1px black"}}></button>
         <img src={profile.pfp} alt={profile.name} className="px-[8px] pt-[8px] rounded-2xl transition" style={{ filter: theme.dark ? "brightness(88%)" : null}}/>
      </div>
     
      <div className="m-0 p-0 poppins text-lg font-[500] flex flex-col center" style={{color: theme.text}} >
         <p>{profile.username}</p>
         <p className="font-light opacity-70 text-[12px] " style={{lineHeight: "10px"}}>{profile.email}</p>
      </div>
     
      <hr style={{color: theme.text}} className="w-[80%] h-1 mt-[8px]"/>

      <div className="m-0 p-0 poppins text-sm flex flex-col center" style={{color: theme.text}} >
         <p>{profile.bio}</p>
      </div>
    </div>
  );
};

export default ProfileBar;
