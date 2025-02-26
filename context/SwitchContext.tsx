import React, { createContext, useContext, useState } from "react";

type SwitchContextType = {
  isActive: boolean;
  toggleSwitch: () => void;
  setSwitchState: (state: boolean) => void;
};

const SwitchContext = createContext<SwitchContextType | undefined>(undefined);

export const SwitchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isActive, setIsActive] = useState(false);

  const toggleSwitch = () => {
    setIsActive((prev) => !prev);
  };

  const setSwitchState = (state: boolean) => {
    setIsActive(state);
  };

  return (
    <SwitchContext.Provider value={{ isActive, toggleSwitch, setSwitchState }}>
      {children}
    </SwitchContext.Provider>
  );
};

export const useSwitch = () => {
  const context = useContext(SwitchContext);
  if (!context) {
    throw new Error("useSwitch must be used within a SwitchProvider");
  }
  return context;
};
