import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import apiClient from "../ApiClient/interceptor";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // ================= GET LOGGED-IN USER =================

  const getUser = async () => {
    try {

      const response = await apiClient.get("/auth/get-user");

      console.log("Get User Response:", response.data);

      // Check your backend response
      setUser(
        response.data?.data ||
        response.data?.user ||
        null
      );

    } catch (error) {

      console.log(
        "Get User Error:",
        error.response?.data || error.message
      );

      setUser(null);

    } finally {

      setLoading(false);

    }
  };


  // ================= CHECK USER ON APP START =================

  useEffect(() => {
    getUser();
  }, []);


  // ================= LOGIN =================

  const login = async (formData) => {

    try {

      const response = await apiClient.post(
        "/auth/signin",
        formData
      );

      console.log("Login Response:", response.data);

      const loggedInUser =
        response.data?.data ||
        response.data?.user ||
        null;

      if (loggedInUser) {
        setUser(loggedInUser);
      }

      return loggedInUser;

    } catch (error) {

      console.log(
        "Login Error:",
        error.response?.data || error.message
      );

      return null;
    }
  };


  // ================= LOGOUT =================

  const logout = async () => {

    try {

      await apiClient.post("/auth/logout");

      setUser(null);

    } catch (error) {

      console.log(
        "Logout Error:",
        error.response?.data || error.message
      );

      // Even if backend logout fails,
      // remove user from frontend state
      setUser(null);
    }
  };


  const value = {
    user,
    setUser,
    login,
    logout,
    isAuthenticated: !!user,
    loading
  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};