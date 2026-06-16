import React, { useEffect, useState } from "react";
import { useLilumTheme } from "./Theme";
import { useClock } from "../../Component/Clock";

export default function ClockBar() {
  const { theme } = useLilumTheme();
  const [mode, setMode] = useState(true);

  const { hour, min, sec, ampm, pro } = useClock(mode ? 12 : 24);
  const { date, day, month, year} = useClock("date");


  return (
    <>
      <div
        className=" w-48 absolute right-1  top-16 flex flex-col items-center rounded-lg rounded-lg backdrop-blur-[2px] border border-[#dbdbdb77]"
        style={{ backgroundColor: theme.bg }}
      >
        <div
          className={`rounded-lg h-40 w-40 my-3 relative opacity-90 flex-col clock-border  flex center`}
          style={{
            "--pro": `${pro}deg`,
            "--color": theme.text,
            color: theme.text
          }}
        >
            <p className="poppins text-lg">{day}</p>
            <p
              className="text-[3.5em] anton"
            >
              {hour} : {min}
            </p>
            <p className="poppins font-light"   >
              {date} / {month} / {year}
            </p>
        </div>


        
      </div>
    </>
  );
}
