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
      addToCartBg: "#FFF5F1",
      addToCartHoverBg: "#ffeae2",
      success: "lightgreen",
    },
    {
      backgroundUpHeader: "#141414",
      backgroundDownHeader: "#1C1C1C",
      background: "#0D0D0D",
      backgroundAside: "#1C1C1C",
      primary: "#F53D2D",
      secondary: "#f53d2d0c",
      mainText: "#FFFFFF",
      h1: "#FFFFFF",
      logo: "#FFFFFF",
      borderInputs: "#FFFFFF",
      addToCartBg: "#292929",
      addToCartHoverBg: "#1C1C1C",
      success: "lightgreen",
    },
  ];

  const themeObject = {
    colors: configColors[theme],
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
