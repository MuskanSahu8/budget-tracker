import {
  createContext,
  useEffect,
  useState
} from "react";

import apiClient from "../ApiClient/interceptor";
import { useContext } from "react";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // GET LOGGED-IN USER
  const getUser = async () => {
    try {
      const response = await apiClient.get("/auth/get-user");

      console.log("Get User Response:", response.data);

      const loggedInUser =
        response.data?.user ||
        response.data?.data ||
        null;

      setUser(loggedInUser);
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

 
  useEffect(() => {
    getUser();
  }, []);

 
  const login = async (formData) => {
    try {
      console.log("Login data:", formData);

      const response = await apiClient.post(
        "/auth/signin",
        formData
      );

      console.log("Login Response:", response.data);

      const loggedInUser =
        response.data?.user ||
        response.data?.data ||
        null;

      if (loggedInUser) {
        setUser(loggedInUser);
      }

      return {
        success: true,
        user: loggedInUser
      };
    } catch (error) {
      console.log(
        "Login Error:",
        error.response?.data || error.message
      );

      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message
      };
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.log(
        "Logout Error:",
        error.response?.data || error.message
      );
    } finally {
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