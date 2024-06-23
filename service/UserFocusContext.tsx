import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

/**
 * This UserFocus context is used to manage which USER we are viewing when toggling between the UserNetworkTopTabNavigator
 * as navigation params are not easily obtained when navigating between the tabs.  Whichever user is currently in UserFocusContext, this
 * is the user who's data we should be searching when navigating between UserNetworkTopTabs
 */
// Define the type for children prop
interface UserFocusProviderProps {
  children: ReactNode;
}

interface UserFocusContextType {
  userFocus: string | null;
  setUserFocus: (value: string | null) => void; // Define setUserFocus as a function that takes a string or null and returns void
}

const UserFocusContext = createContext<UserFocusContextType>({
  userFocus: null,
  setUserFocus: () => null,
});

export const useUserFocus = () => useContext(UserFocusContext);

export const UserFocusProvider: React.FC<UserFocusProviderProps> = ({
  children,
}) => {
  const [userFocus, setUserFocus] = useState<string | null>(null);

  useEffect(() => {
    console.log(
      "=====>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>==============================================================User focus changed:",
      userFocus
    );
  }, [userFocus]);

  return (
    <UserFocusContext.Provider value={{ userFocus, setUserFocus }}>
      {children}
    </UserFocusContext.Provider>
  );
};
