import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

const PopUp = ({
  title,
  children,
  id,
  focus,
  z,
  x,
  y,
  onClose,
  handleStyle,
  XStyle,
  style,
  fullStyle,
  bodyStyle,
  mainStyle
}) => {
  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({ id });
  const [full, setFull] = useState(false);


  return (
    <div
      className={`absolute ${full ?  "w-screen h-screen" : "w-[400px] h-[300px]" } ${!full && "rounded-2xl"} top-0 left-0 shadow-2xl overflow-hidden bg-white border border-[#dbdbdb77] flex flex-col`}
      style={{
        top: full ? 0 : y,
        left: full ? 0 : x,
        
        transform: full ? null : (transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined),
        zIndex: isDragging ? (z += 1) : z,
        boxShadow: isDragging
          ? "6px 9px 15px rgba(0,0,0,0.3)"
          : "1px 1px 5px rgba(0,0,0,0.1)",
        ...style,
      }}
      onMouseDown={() => focus(id)}
    >
      {/* Handle */}
      <div
        className={`flex relative h-7 text-black shrink-0`}
        style={{ ...handleStyle , userSelect: "none", touchAction: "none"}}
      >
        {" "}
        <div
          className="h-full w-full m-1 cursor-grab"
          {...listeners}
          {...attributes}
          ref={setNodeRef}
        >
          <p className="font-mono">{title}</p>{" "}
        </div>
        <button className={`w-10 font-mono  h-full absolute right-7 flex center ${fullStyle && fullStyle}`} onClick={() => {setFull((prev) => !prev)}}>
          <span className="material-symbols-outlined" style={{fontSize: "15px", fontWeight: "bold"}}>crop_square</span>
        </button>
        <button
          className={`w-10 font-mono h-full absolute ${XStyle && XStyle} right-0`}
          onClick={() => onClose(id)}
          onMouseDown={(e) => e.stopPropagation()}
        >
          ✖
        </button>
      </div>

      <div className={`flex-1 overflow-auto ${bodyStyle && bodyStyle}`} style={{...mainStyle}}>{children}</div>
    </div>
  );
};

export default PopUp;
