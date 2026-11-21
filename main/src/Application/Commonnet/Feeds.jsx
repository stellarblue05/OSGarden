import React, { useState, useMemo, useEffect } from "react";

import Gallery from "./Gallery.jsx";
import Post from "./Post.jsx";

const Feeds = ({ CNtheme, setPage, Users, Posts, CNprofile, profile }) => {
  const selfPost = CNprofile?.posts || [];

  const shuffled = useMemo(() => {
    return [...Posts, ...selfPost].sort(() => Math.random() - 0.5);
  }, [Posts, selfPost]);

  useEffect(() => {
    const popupBody = document.querySelector(".lilum-scroll");
    if (popupBody) {
      popupBody.scrollTop = 0;
    }
  }, []);

  const userPosts = shuffled.filter((e) => e?.uid === "user");

  return (
    <div className="w-full h-full">
      <div className="inherit flex flex-col items-center">
        <div className={`w-7/8 h-10 my-2 rounded`}>
          <p className="font-bold text-4xl" style={{ color: CNtheme.yellow }}>
            Commonnet :3
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
          <button
            onClick={() => setPage({ type: "self" })}
            className="cursor-pointer"
          >
            <img
              src={CNprofile.pfp}
              className="border-2  border-transparent  transition hover:border-[#F4C24E] h-11 w-11 rounded-full ml-1"
            />
          </button>

          <button
            style={{ color: CNtheme.text, borderColor: `${CNtheme.text}50` }}
            className="cursor-text opacity-50 duration.50 hover:bg-[#F4C24E] hover:opacity-90 transition  border border-1 transparent border-opacity-50 w-62 rounded-lg h-9"
            onClick={() => {
              setPage({ type: "create" });
            }}
          >
            Chat With Everyone
          </button>
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
            CNprofile={CNprofile}
            profile={profile}
            shuffled={shuffled}
          />
        ))}
      </div>
    </div>
  );
};

export default Feeds;
