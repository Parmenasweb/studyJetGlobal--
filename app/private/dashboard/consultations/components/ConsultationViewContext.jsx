"use client";

import { createContext, useContext, useState } from "react";

const ConsultationViewContext = createContext({
  viewMode: "table",
  toggleViewMode: () => {},
});

export function ConsultationViewProvider({ children }) {
  const [viewMode, setViewMode] = useState("table");

  const toggleViewMode = () => {
    setViewMode((current) => (current === "table" ? "calendar" : "table"));
  };

  return (
    <ConsultationViewContext.Provider value={{ viewMode, toggleViewMode }}>
      {children}
    </ConsultationViewContext.Provider>
  );
}

export const useConsultationView = () => useContext(ConsultationViewContext); 