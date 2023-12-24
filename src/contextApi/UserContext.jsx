import { createContext, useEffect, useState } from "react";
import dev from "../config";

export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const getUser = localStorage.getItem("user");
  const [authUser, setAuthUser] = useState(
    JSON.parse(getUser || JSON.stringify({}))
  );
  const [authStateChange, setAuthStateChange] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    setAuthUser(JSON.parse(getUser || JSON.stringify({})));
    fetch(`${dev.serverUrl}/api/users/${authUser?._id}`)
      .then((res) => res.json())
      .then((data) => data.success && setUser(data.user));
  }, [getUser]);

  // log out
  const logout = () => {
    localStorage.setItem("user", JSON.stringify({}));
    setAuthUser("");
  };

  const authInfo = {
    user,
    authUser,
    setAuthUser,
    logout,
    authStateChange,
    setAuthStateChange,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
