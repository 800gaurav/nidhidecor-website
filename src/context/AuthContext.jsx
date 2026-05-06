// src/context/AuthContext.jsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
// import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const AuthContext = createContext();
const cookies = new Cookies();

export function AuthProvider({ children }) {
  // const [userData, setuserData] = useState(false)
  const [loading, setloading] = useState(false);
  const [userData, setuserData] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigateRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);

  const setNavigateRef = (nav) => {
    navigateRef.current = nav;
  };

  //  Login Function
  function login(data) {
    console.log('im here')
    if (!data?.token) return console.error("Token is missing in login data");

    const userData = { ...data };
    delete userData.token; // remove token from user data before storing

    cookies.set("USER", JSON.stringify(userData), { path: "/" });
    cookies.set("TOKEN", data.token, { path: "/" }); // token stored separately as plain string
    cookies.set("isLoggedIn", "true", { path: "/" });
    setIsLoggedIn(true)

    setCurrentUser(userData);
    setToken(data.token);

    if (navigateRef.current) {
      console.log('herre')
      navigateRef.current("/dashboard");
    }
  }

  // ✅ Logout Function
  function logout() {

    // return 
    cookies.remove("USER", { path: "/" });
    cookies.remove("TOKEN", { path: "/" });
    cookies.remove("isLoggedIn", { path: "/" });
    window.location.href = '/';

    setCurrentUser(null);
    setToken(null);
    setIsLoggedIn(false)

if (window.ReactNativeWebView) {
  window.ReactNativeWebView.postMessage('LOGOUT');
}

    if (navigateRef.current) {
     
      navigateRef.current("/");
    }
  }

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userFromCookie = cookies.get("USER");
        const tokenFromCookie = cookies.get("TOKEN");
        const isLoggedInCookie = cookies.get("isLoggedIn");

        console.log('Auth check cookies:', { userFromCookie, tokenFromCookie, isLoggedInCookie });

        if (userFromCookie && tokenFromCookie && (isLoggedInCookie === true || isLoggedInCookie === "true")) {
          const userData = typeof userFromCookie === 'string' ? JSON.parse(userFromCookie) : userFromCookie;
          setCurrentUser(userData);
          setToken(tokenFromCookie);
          setIsLoggedIn(true);
          console.log('User authenticated from cookies');
        } else {
          setCurrentUser(null);
          setToken(null);
          setIsLoggedIn(false);
          console.log('No valid authentication found');
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setAuthLoaded(true);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, token, login, logout, setNavigateRef, loading, setloading, isLoggedIn, setIsLoggedIn, userData, setuserData, authLoaded }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
