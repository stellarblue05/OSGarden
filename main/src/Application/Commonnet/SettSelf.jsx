import React, { useState, useRef } from "react";

export default function SettSelf({ CNprofile, setCNprofile, onBack, CNtheme }) {
  const user = CNprofile;

  const nameRef = useRef(null);
  const bioRef = useRef(null);

  const name = user.name;
  const bio = user.bio;
  function onSave() {
    setCNprofile((prev) => ({
      ...prev,
      name: nameRef.current.value || prev.name,
      bio: bioRef.current.value || prev.bio,
    }));

    onBack();
  }

  return (
    <div
      className="inset-0 z-10 absolute flex flex-col poppins justify-between overflow-x-hidden"
      style={{ backgroundColor: CNtheme.bg }}
    >
      <div className="flex">
        <button
          onClick={onSave}
          style={{ color: CNtheme.text }}
          className=" hover:backdrop-brightness-50 flex center transition rounded-full"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>{" "}
          <p>Save</p>
        </button>
      </div>

      <div
        className="w-full h-20 relative"
        style={{ backgroundColor: user?.col || CNtheme.sec }}
      >
        <img
          src={user?.pfp}
          alt={user.name}
          className="h-25 w-25 rounded-full absolute -bottom-10 left-1/2 -translate-x-1/2 "
          style={{ border: `4px solid ${CNtheme.bg}` }}
        />
      </div>
      <div className="ml-2 mt-10 w-full flex gap-[1em] relative">
        <p className=" opacity-50">name:</p>
        <input
          className="poppins outline-none font-bold text-lg opacity-100 leading-0 w-7/10"
          maxLength={20}
          defaultValue={user?.name}
          style={{ borderBottom: `2px solid ${CNtheme.shadow}` }}
          ref={nameRef}
        />
      </div>

      <div className="ml-2 mb-5 w-full flex flex-col relative ">
        <p className="opacity-50">bio:</p>
        <textarea
          className="poppins opacity-100 p-2 resize-y max-w-[90%] max-h-40 outline-none rounded-2xl lilum-scroll"
          ref={bioRef}
          defaultValue={user?.bio}
          style={{ border: `2px solid ${CNtheme.shadow}` }}
        />
      </div>
    </div>
  );
}
