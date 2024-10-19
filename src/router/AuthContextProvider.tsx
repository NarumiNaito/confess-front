import { PropsWithChildren, createContext, useEffect, useState } from "react";

// Login状態のContext
export const LoggedInContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([false, () => {}]);

export function AuthContextProvider({ children }: PropsWithChildren) {
  // stateの定義
  const storedLogin = sessionStorage.getItem("is-login");
  const [loggedIn, setLoggedIn] = useState<boolean>(storedLogin === "true");

  useEffect(() => {
    if (loggedIn) {
      sessionStorage.setItem("is-login", "true");
    } else {
      sessionStorage.removeItem("is-login");
    }
  }, [loggedIn]);

  return <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>{children}</LoggedInContext.Provider>;
}
