import React, { createContext, useEffect, useState } from "react";

export const appContext = createContext();

function AppContext({ children }) {
  const [currency, setCurrency] = useState("USD");


  return (
    <appContext.Provider
      value={{
        currency: currency,
        setCurrency: setCurrency,
      }}
    >
      {children}
    </appContext.Provider>
  );
}

export default AppContext;
