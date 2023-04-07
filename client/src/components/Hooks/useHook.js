import React, { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const [login, setLogin] = useState(false);
  const [websocket, setWebSocket] = useState(null);
  useEffect(() => {
    (async () => {
      setLoading(false);
    })();
    
  }, []);

  useEffect(() => {
    if (websocket === null) {
      if (!login) return;
      console.log("Websocket connecting...");
      setTimeout(() => {
        const socket = new WebSocket("wss://170.187.254.59:8080");
        socket.addEventListener("open", (event) => {
          console.log("WebSocket connection is open");
        });
        socket.addEventListener("close", (event) => {
          console.log("WebSocket connection closed");
          setWebSocket(null);
        });
        setWebSocket(socket);
      }, 1000);

      // setTimeout(() => {
      //   const newSocket = new WebSocket("wss://172.105.39.25:8080");
      //   setWebSocket(newSocket);
      // }, 5000);
    }
    return () => {
      if (websocket) websocket.close();
    };
  }, [websocket, login]);

  const value = {
    user,
    login,
    setLogin,
    websocket,
  };

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
