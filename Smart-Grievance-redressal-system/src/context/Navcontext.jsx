import { createContext, useContext, useState } from "react";

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [section, setSection] = useState("overview");

  return (
    <UIContext.Provider
      value={{
        navOpen,
        setNavOpen,
        section,
        setSection,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
