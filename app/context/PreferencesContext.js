import React, { createContext, useContext } from "react";

const PreferencesContext = createContext(null);

export function PreferencesContextProvider({ children, value }) {
  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferencesContext() {
  const context = useContext(PreferencesContext);

  if (!context)
    throw new Error(
      "themeContext must be called from within the XContextProvider"
    );

  return context;
}
