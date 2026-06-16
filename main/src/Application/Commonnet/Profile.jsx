import React, { useState, useMemo, useEffect } from "react";
import Post from "./Post.jsx";
export default function ({ CNtheme, onBack, userId, Users, Posts , theme}) {
  const user = useMemo(() => {
    return Users.find((u) => u.id === userId)
  }, [Users, userId]);

  const userPosts = Posts.filter((e) => {
    return e?.uid == userId;
  });

  useEffect(() => {
    const popupBody = document.querySelector(".lilum-scroll");
    if (popupBody) {
      popupBody.scrollTop = 0;
    }
  }, [userId]);



  const date = new Date(user.t || "2020-01-01T08:00:00");
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();

  return (
    <div className="inset-0 flex flex-col center">
      <div className="flex flex-col inset-0 relative w-full h-full gap-1">
        <div
          className="w-full h-20 relative"
          style={{ backgroundColor: user.col || CNtheme.sec }}
        >
          <button onClick={onBack} style={{color: CNtheme.text}} className="m-1 hover:backdrop-brightness-50 flex center p-1 transition rounded-full ">
            <span className="material-symbols-outlined  ">arrow_back_ios_new</span>
          </button>
          <img
            src={user.pfp || "https://picsum.photos/200"}
            alt={user.un}
            className="h-20 w-20 absolute -bottom-10 left-1 rounded-full"
            style={{ border: `3px solid ${CNtheme.bg}` }}
          />
        </div>
        <div className="ml-22">
          <p className="font-bold poppins text-lg flex gap-1 items-center">
            {user.n || user.un}
            {user?.v ? (
              <span
                className="material-symbols-outlined"
                style={{ color: CNtheme.yellow, fontSize: "20px" }}
              >
                verified
              </span>
            ) : null}
          </p>
          <p className="text-sm leading-0 opacity-45">@{user.un}</p>
        </div>

        <div className="m-1 mt-2">
          <p className="text-sm opacity-95">{user.bio}</p>
        </div>

        <div className="flex flex-col text-sm ml-1 mb-1 opacity-45 gap-1 leading-0">
          <p className="flex items-center">
            <span
              className="material-symbols-outlined mr-1"
              style={{ fontSize: "14px" }}
            >
              date_range
            </span>
            Joined {month} {day}, {year}
          </p>

          <p className="flex items-center">
            <span
              className="material-symbols-outlined mr-1"
              style={{ fontSize: "14px" }}
            >
              location_on
            </span>
            {user.loc}
          </p>
        </div>

        <div className="flex h-14 w-[90%] gap-[15%] ml-1 text-[14px]">
          <div>
            <p className="opacity-55">Followers</p>
            <p className="poppins font-bold">{user.fer || 0}</p>
          </div>
          <div>
            <p className="opacity-55">Following</p>
            <p className="poppins font-bold">{user.ing || 0}</p>
          </div>
        </div>
        <br />
        <p className="ml-1 font-[500] poppins text-sm rounded">Posts {">"}</p>
        <hr className="opacity-50" />
      </div>
      <div className="mx-2 mb-2">
        {userPosts?.map((post) => (
          <Post
            key={post.id}
            post={post}
            Users={Users}
            CNtheme={CNtheme}
            style={{
              width: "100%",
              margin: "0",
              marginTop: "12px"
            }}
          />
        ))}
      </div>
    </div>
  );
}
