"use client";

import React, { createContext, useEffect, useState } from "react";

const JsonContext = createContext();

const JsonContextProvider = ({ children }) => {
  const [silverMode, setSilverMode] = useState(false);
  const [currency, setCurrency ] = useState('amd');

  useEffect(() => {
    
    if (silverMode) {
      document.body.classList.add("silverMode");
    } else {
      document.body.classList.remove("silverMode");
    }

    return () => {
      document.body.classList.remove("silverMode");
    };
  }, [silverMode]);

  return (
    <JsonContext.Provider
      value={{
        silverMode,
        setSilverMode,
        currency,
        setCurrency
      }}
    >
      {children}
    </JsonContext.Provider>
  );
};

export { JsonContext, JsonContextProvider };
