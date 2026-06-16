import React from "react";

export default function Gallery({ media }) {
  if (!media?.length) return null;
  if (media.length == 1 && media[0].t === "ps") return null

  return (
    <div
      className={`grid gap-1 overflow-hidden ${media.length === 1 ? "grid-cols-1" : "grid-cols-2"}`} 
    >
      {media.length <= 4 ? (
        media.map((src, i) => (
          <img key={i} src={src.s} alt="" className="aspect-square object-cover"/>
        ))
      ) : (
        <>
          {media.slice(0, 4).map((src, i) => (
            <img key={i} src={src.s} alt="" className="w-full aspect-square object-cover"/>
          ))}

          <div className="absolute inset-0 flex items-center justify-center">
            +{media.length - 4}
          </div>
        </>
      )}
    </div>
  );
}
