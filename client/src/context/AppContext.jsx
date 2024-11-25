import { createContext, useState } from "react";
import { Toaster } from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  return (
    <AppContext.Provider value={{ user, setUser }}>
      <>
        <Toaster />
        <div>{children}</div>
      </>
    </AppContext.Provider>
  );
};
