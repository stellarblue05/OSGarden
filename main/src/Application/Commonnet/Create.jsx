import React, { useState, useRef } from "react";

export default function Create({ CNtheme, CNprofile, setCNprofile, onBack }) {
  const user = CNprofile;

  const name = user.name;
  const bio = user.bio;

  function onPost() {
    if (!postRef.current.value) return;
    setCNprofile((prev) => ({
      ...prev,
      posts: [
        ...prev.posts,
        {
          id: Math.round(Math.random() * 100000), //TEMP (Maybe forever)
          uid: "user",
          c: postRef.current.value,
          m: [],
          l: 0,
          dl: 0,
          s: 0,
          v: 0,
          tag: "",
          t: new Date("2026-06-01T12:00:00Z"),
        },
      ],
    }));

    onBack();
  }

  //Fix text area size
  const postRef = useRef(null);

  function handleResize() {
    const el = postRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  return (
    <div className="inset-0 flex flex-col mr-2">
      <div
        className="flex center rounded-b-sm w-[102%]"
        style={{ backgroundColor: CNtheme.sec }}
      >
        <h3 className="font-bold poppins">Creating a wonderful post...</h3>
      </div>

      <div id="Header(profile)" className="m-1 flex w-full justify-between">
        <div className="flex">
          <img
            src={user?.pfp || "https://picsum.photos/200"}
            alt={user?.un}
            className="h-12 w-12 rounded-full"
          />

          <div className="ml-1 flex flex-col relative bottom-[5.5px]">
            <p className="font-semibold text-lg">{name}</p>
            <p className="font-thin relative bottom-2 opacity-60 text-sm">
              @{user.username}
            </p>
          </div>
        </div>

        <button
          onClick={onBack}
          style={{ color: CNtheme.text }}
          className="btn-hover h-11 w-11  cursor-pointer center flex transition rounded-full poppins font-bold font-lg"
        >
          X
        </button>
      </div>
      <div className="w-full ml-1 flex flex-col justify-center">
        <textarea
          ref={postRef}
          onInput={handleResize}
          placeholder={`What's in your mind ${name}?`}
          className="w-[95%]  caret-[#F4C24E] border-0 outline-none text-xl min-h-20 resize-none overflow-hidden bg-transparent"
          rows={1}
          maxLength={450}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onPost();
            }
          }}
        />
        <div className="opacity-20">Add Tag (WIP)</div>
        <div className="w-full h-[37px] ">
          <button
            className="rounded h-[37px] w-full cursor-pointer font-bold poppins"
            style={{ backgroundColor: CNtheme.yellow }}
            onClick={onPost}
          >
            POST!
          </button>
        </div>
      </div>
    </div>
  );
}
