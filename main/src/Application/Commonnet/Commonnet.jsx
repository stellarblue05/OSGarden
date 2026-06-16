import React, { useEffect, useState } from "react";
import PopUp from "../../Component/Pop-up";
import { useLilumTheme } from "../../Systems/Lilum/Theme";
import { useProfile } from "../../Data/Profile.jsx";

import Users from "../../Data/CommonnetData/Users.json";
import Posts from "../../Data/CommonnetData/Posts.json";

import Feeds from "./Feeds";
import Profile from "./Profile";
import Self from "./Self.jsx"

const Commonnet = (props) => {
  const { profiles, setProfiles } = useProfile();
  
    const profile = profiles?.lilum;
    const CNprofile = profile?.cn;

    function setCNProfile(e) {
    setProfiles(prev => ({
      ...prev,
      lilum: {
        ...prev.lilum,
      cn:
        typeof e === "function"
          ? e(prev.lilum.cn)
          : e
      }
    }))};
  
  
  const { theme } = useLilumTheme();

  const [CNtheme, setCNtheme] = useState({});


  useEffect(() => {
    //this pallet made by chat-gpt will change soon
    if (theme.dark) {
      setCNtheme({
        bg: "#181A1F", // Main background
        pri: "#22252B", // Cards/posts
        sec: "#2e3134", // Elevated surfaces
        light: "#4B5563", // Borders/hover
        dark: "#111317", // Deep shadows
        yellow: "#F4C24E", // Brand color
        text: "#F9FAFB", // Main text
        super: "white",
        blue: "#3B82F6",
        shadow: "#f9fafb26",
      });
    } else {
      setCNtheme({
        bg: "#fffaec", // App background
        pri: "#FFFFFF", // Cards/posts
        sec: "#F5F7FA", // Secondary surfaces
        light: "#fcefdd", // Borders
        dark: "#D1D5DB", // Strong accents
        yellow: "#F4C24E", // Brand color
        text: "#374151", // Main text
        super: "black",
        blue: "#60A5FA",
        shadow: "#3741511c",
      });
    }
  }, [theme.dark]);

  /*User ID placement
  1. 1 = Admin 2=Company 3=Influenser 4=Meme 5=Adult 6=kids 7=Formal 8=Goverment 9=Avarage Joe
  */

 const [page, setPage] = useState({type: "feed"});

 function pages () {
  if (page.type === "profile") {
    return(<Profile CNtheme={CNtheme} Posts={Posts} userId={page.userId} onBack={() => setPage({type: "feed"})} Users={Users} />)
  }
  if (page.type === "self") {
    return(<Self CNtheme={CNtheme} onBack={() => setPage({type: "feed"})} profile={profile} setCNProfile={setCNProfile} CNprofile={CNprofile}/>)
  }
  else {
    return(<Feeds CNtheme={CNtheme} setPage={setPage} Users={Users} Posts={Posts} theme={theme} CNprofile={CNprofile}/>)
  }
 }



  return (
    <PopUp
      title="CommonNet"
      {...props}
      style={{
        color: CNtheme.text,
        backgroundColor: CNtheme.bg,
      }}
      handleStyle={{
        backgroundColor: CNtheme.light || "White",
        color: theme.dark ? "white" : CNtheme.text || "Black",
      }}
      bodyStyle="scroll-thin lilum-scroll selection:bg-[#F4C24E] selection:text-white "
    >
      {pages()}
    </PopUp>
  );
};


export default Commonnet;
