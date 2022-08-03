import { prefix } from "../config/config";
import { createContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { currentTheme, recentlyPlayed, isNavShow } = state;
  const systemPrefers = useMediaQuery({
    query: "(prefers-color-scheme: dark)",
  });
  // const isMobile = useMediaQuery({ maxDeviceWidth: 480 });

  useEffect(() => {
    const osTheme = systemPrefers ? "dark" : "light";
    const userTheme = localStorage.getItem("color-theme");
    const theme = userTheme || osTheme;
    dispatch({ type: "setTheme", value: theme });
  }, [systemPrefers]);

  return (
    <UserContext.Provider
      value={{
        dispatch,
        prefix,
        currentTheme,
        recentlyPlayed,
        isNavShow,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
