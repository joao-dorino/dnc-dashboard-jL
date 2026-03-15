import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/styles";
import { AppThemeContext } from "./AppThemeContext";

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const savedTheme = localStorage.getItem("theme");

  const [appTheme, setAppTheme] = useState(savedTheme ?? "light");

  const toggleTheme = () => {
    setAppTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", appTheme);
  }, [appTheme]);

  return (
    <AppThemeContext.Provider value={{ appTheme, toggleTheme }}>
      <ThemeProvider theme={appTheme === "light" ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
};
