import { PropsWithChildren, createContext, useState } from "react";

// Login状態のContext
export const LoggedInContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>]>([false, () => {}]);

export function AuthContextProvider({ children }: PropsWithChildren) {
  // stateの定義
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>{children}</LoggedInContext.Provider>;
}
