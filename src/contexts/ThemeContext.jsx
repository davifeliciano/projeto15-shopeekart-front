import { React, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", 0);

  const configColors = [
    {
      backgroundUpHeader: "#F53D2D",
      backgroundDownHeader: "#FF6533",
      background: "#FFFFFF",
      backgroundAside: "#F5F5F5",
      primary: "#F53D2D",
      secondary: "#f53d2d0c",
      mainText: "#000000cc",
      h1: "#333",
      logo: "#FFFFFF",
      borderInputs: "#ccc",
    },
    {
      backgroundUpHeader: "",
      backgroundDownHeader: "",
      background: "",
      backgroundAside: "",
      primary: "",
      secondary: "",
      mainText: "",
      h1: "",
      logo: "",
      borderInputs: "",
    },
  ];

  const themeObject = {
    colors: {
      backgroundUpHeader: configColors[theme].backgroundUpHeader,
      backgroundDownHeader: configColors[theme].backgroundDownHeader,
      background: configColors[theme].background,
      backgroundAside: configColors[theme].backgroundAside,
      primary: configColors[theme].primary,
      secondary: configColors[theme].secondary,
      mainText: configColors[theme].mainText,
      h1: configColors[theme].h1,
      logo: configColors[theme].logo,
      borderInputs: configColors[theme].borderInputs,
      // add more theme properties as needed
    },
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={themeObject}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
