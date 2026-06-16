import React, { useState, useMemo, useEffect } from "react";

import Gallery from "./Gallery.jsx";
import Post from "./Post.jsx";

const Feeds = ({ CNtheme, setPage, Users, Posts, CNprofile }) => {
  const shuffled = useMemo(() => {
    return [...Posts].sort(() => Math.random() - 0.5);
  }, [Posts]);

  //Go on top when reload
  useEffect(() => {
    const popupBody = document.querySelector(".lilum-scroll");
    if (popupBody) {
      popupBody.scrollTop = 0;
    }
  }, []);

  return (
    <div className="w-full h-full">
      <div className="inherit flex flex-col items-center">
        <div className={`w-7/8 h-10 my-2 rounded`}>
          <p className="font-bold text-4xl" style={{ color: CNtheme.yellow }}>
            Commonnet :-)
          </p>
        </div>

        <div
          className="rounded-2xl border border-white/10 inter w-7/8  flex overflow-hidden items-center h-12 relative gap-1"
          style={{
            color: CNtheme.text,
            backgroundColor: CNtheme.pri,
            boxShadow: `1px 1px 1px 1px ${CNtheme.sec}`,
            border: `1px solid ${CNtheme.shadow}`,
          }}
        >
          <button onClick={() => setPage({type: "self"})} className="cursor-pointer">
            <img src={CNprofile.pfp} className="h-10 w-10 rounded-full ml-1" />
          </button>

          <input type="text" placeholder="Chat with everyone!" style={{color: CNtheme.text}}/>
          <button className="absolute right-3 h-full flex center">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>

        {shuffled?.map((post) => (
          <Post
            setPage={setPage}
            key={post.id}
            post={post}
            Users={Users}
            CNtheme={CNtheme}
          />
        ))}
      </div>
    </div>
  );
};

export default Feeds;
