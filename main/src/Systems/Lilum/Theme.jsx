import React, {createContext, useContext} from "react";

export const LilumThemeContext = createContext();
export const useLilumTheme = () =>{ return useContext(LilumThemeContext)}

export default function lilumTheme (dark) {

    return dark ? {
        bg: "#2A2438CC",
        fbg: "#2A2438",
        pri: "#151822",
        sec: "#2a2438",
        panel: "#23283A",
        text: "#E8EAF2",
        hover: "rgba(255,255,255,0.1)",
        dark: true
    } : {
        bg: "#bfaaca73",
        fbg: "#bfaaca",
        pri: "#F7F5FF",
        sec: "#bfaaca73",
        panel: "#FFFFFF",
        text: "#2A2D3E",
        hover: "rgba(0,0,0,0.1)",
        dark: false,
    }
}