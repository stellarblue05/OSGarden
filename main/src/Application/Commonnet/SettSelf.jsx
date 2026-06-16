import React, { useState } from "react";

export default function SettSelf({ CNprofile, setCNprofile, onBack, CNtheme }) {
  return (
    <div
      className="inset-0 z-10 absolute"
      style={{ backgroundColor: CNtheme.bg }}
    >
      <div>
        <button
          onClick={onBack}
          style={{ color: CNtheme.text }}
          className="m-1 hover:backdrop-brightness-50 flex center p-1 transition rounded-full"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span> <p className="ml-1 poppins opacity-75">Work in progress</p>
        </button>
      </div>
      <hr className="opacity-30"/>
    </div>
  );
}
