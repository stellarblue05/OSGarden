import React from "react";
import { Link } from 'react-router-dom'


const Start = () => {
  return (
    <div className="crt">
    <div className="h-screen w-screen bg-black overflow-x-hidden">
      <div className="w-full">
        <p className="text-green-400 font-mono">  &gt; Welcome!</p>
        <pre className="text-green-400 font-mono text-[0.55rem] sm:text-xs md:text-sm lg:text-base leading-tight whitespace-pre drop-shadow-[0_0_12px_rgba(74,222,128,0.8)]">
        
          {String.raw`
 _______ _    _ ______    _____          _____  _____  ______ _   _ 
|__   __| |  | |  ____|  / ____|   /\   |  __ \|  __ \|  ____| \ | |
   | |  | |__| | |__    | |  __   /  \  | |__) | |  | | |__  |  \| |
   | |  |  __  |  __|   | | |_ | / /\ \ |  _  /| |  | |  __| |   \ |
   | |  | |  | | |____  | |__| |/ ____ \| | \ \| |__| | |____| |\  |
   |_|  |_|  |_|______|  \_____/_/    \_\_|  \_\_____/|______|_| \_|
`}
        </pre>
        <div className="border-6 border-green-400 w-full h-10 my-2 border-double">
            <p className="text-green-400 font-mono">The OS Simulator </p>
        </div>
      </div>
      <div className="text-green-400 font-mono">
        <p>:C/DevNote&gt; WIP rn frfr </p>
      </div>
      <div className="flex flex-wrap gap-4 m-2">
        <div className="h-[400px] w-[400px] border-4 border-green-400 border-double text-green-400 font-mono relative">
            <p className="m-2">Id: yGYQGd6AQe</p>
            <p className="m-2">User: Daisy1280</p>
            <p className="m-2">OS: LILUM-OS</p>
            <p className="m-2">Device: Ampro Pad 12</p>
            <button className="border-2 border-green-400 h-[40px] w-[30%] max-w-[200px] absolute bottom-2 right-2 hover:bg-green-400 hover:text-white">
              <Link to='/Lilum'>Connect</Link>
            </button>
        </div>
         <div className="h-[400px] w-[400px] border-4 border-green-400 border-double text-green-400 font-mono relative">
            <p className="m-2">Id: sNndBW7u83</p>
            <p className="m-2">User: BloboxKiz6767</p>
            <p className="m-2">OS: Lag OS</p>
            <p className="m-2">Device: Toaster</p>
            <button className="border-2 border-green-400 h-[40px] w-[30%] max-w-[200px] absolute bottom-2 right-2 hover:bg-green-400 hover:text-white">Connect</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Start;
