import React, { useState } from "react";

export default function Comment({ c, Users, CNtheme, onError }) {
  const cuser = Users.find((u) => u.id === c.uid);

  const [clike, setClike] = useState(false);
  const [readMore, setReadMore] = useState(false);

  let text_limit = 50;
  const isLongText = c?.c?.length > text_limit;

  return (
    <div
      key={c.id}
      style={{ color: CNtheme.text }}
      className="flex gap-2 relative my-[12px]"
    >
      <div className="w-full h-full flex items-start  relative">
        <img
          src={cuser?.pfp}
          alt={cuser?.n}
          className="w-8 h-8 m-1 rounded-[50%]"
          onError={onError}
        />

        <div className="text-sm ml-1 mr-4">
          <p className="opacity-95 text-[11.5px]">{cuser?.n} </p>
          <p className={`${isLongText && !readMore ? "line-clamp-2": ""}`}>{c?.c}</p>
         {isLongText && <button  onClick={() => setReadMore((prev) => !prev)}>
           <p className="text-[12px] opacity-75 hover:opacity-90 hover:underline">{readMore ? "Show Less" : "Read More"}</p>
          </button>}
        </div>

        <div className="absolute right-2 flex flex-col center top-1">
          <button
            className=" h-fit w-fit leading-0"
            onClick={() => setClike((prev) => !prev)}
            style={{ fontSize: "22px" }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                opacity: clike ? "100%" : "25%",
                color: clike && "#dc3a3a",
              }}
            >
              {!clike ? "heart_plus" : "favorite"}{" "}
            </span>
          </button>

          <p className="leading-none text-[12px] opacity-85 font-light">
            {clike ? c.l + 1 || 1 : c.l || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
