import React, { createContext, useContext } from "react";

export const LilumThemeContext = createContext();
export const useLilumTheme = () => {
  return useContext(LilumThemeContext);
};

export default function lilumTheme(dark, themeStyle) {
  const theme = {
    1: {
      dark: {
        bg: "#2A2438CC",
        fbg: "#2A2438",
        pri: "#151822",
        sec: "#2a2438",
        panel: "#23283A",
        text: "#E8EAF2",
        hover: "rgba(255,255,255,0.1)",
        dark: true,
      },
      light: {
        bg: "#bfaaca73",
        fbg: "#bfaaca",
        pri: "#F7F5FF",
        sec: "#bfaaca73",
        panel: "#FFFFFF",
        text: "#2A2D3E",
        hover: "rgba(0,0,0,0.1)",
        dark: false,
      },
    },
    2: {
      dark: {
        bg: "#5591cecc",
        fbg: "#5591ce",
        pri: "#172C46",
        sec: "#334B68",
        panel: "#243B53",
        text: "#EAF4FF",
        hover: "rgba(255,255,255,0.1)",
        dark: true,
      },
      light: {
        bg: "#CDE7F8CC",
        fbg: "#B8DCF3",
        pri: "#F2F9FF",
        sec: "#DCEEFF",
        panel: "#FFFFFF",
        text: "#29445C",
        hover: "rgba(0,0,0,0.1)",
        dark: false,
      },
    },
    3: {
      dark: {
        bg: "#1E1E2ECC",
        fbg: "#1E1E2E",
        pri: "#11111B",
        sec: "#313244",
        panel: "#181825",
        text: "#CDD6F4",
        hover: "rgba(255,255,255,0.1)",
        dark: true,
      },
      light: {
        bg: "#EFF1FACC",
        fbg: "#EFF1F A",
        pri: "#DCE0E8",
        sec: "#CCD0DA",
        panel: "#FFFFFF",
        text: "#22232c",
        hover: "rgba(0,0,0,0.1)",
        dark: false,
      },
    },
    4: {
      dark: {
        bg: "#181A1F",
        fbg: "#111317",
        pri: "#22252B",
        sec: "#2e3134",
        panel: "#F4C24E",
        text: "#F4C24E",
        hover: "rgba(249,250,251,0.1)",
        light: "#4B5563",
        dark: true,
      },
      light: {
        bg: "#fffaec",
        fbg: "#fcefdd",
        pri: "#FFFFFF",
        sec: "#eeccaa",
        panel: "#F4C24E",
        text: "#374151",
        hover: "rgba(55,65,81,0.1)",
        light: "#fcefdd",
        dark: false,
      },
    },
  };
  const selectedTheme = theme[themeStyle] ?? theme[1];

  return {
    ...selectedTheme[dark ? "dark" : "light"],
    dark,
  };
}
