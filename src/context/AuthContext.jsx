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

  // Get logged-in user
  const getUser = async () => {
    try {
      const response = await apiClient.get("/auth/get-user");

      console.log("Get User Response:", response.data);

      setUser(response.data.data);

    } catch (error) {
      console.log("Get User Error:", error.message);

      setUser(null);

    } finally {
      setLoading(false);
    }
  };

  // Check user when app starts
  useEffect(() => {
    getUser();
  }, []);

  // Login
  const login = async (formData) => {
    try {
      const response = await apiClient.post(
        "/auth/signin",
        formData
      );

      console.log("Login Response:", response.data);

      setUser(response.data.data);

      return response.data.data;

    } catch (error) {
      console.log("Login Error:", error.message);

      return null;
    }
  };

  const value = {
    user,
    setUser,
    login,
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

  return context;
};