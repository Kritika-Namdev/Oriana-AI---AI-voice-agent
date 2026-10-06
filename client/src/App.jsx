import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Billing from "./pages/Billing";
import Builder from "./pages/Builder";
import { Toaster } from "react-hot-toast";
export const ServerUrl = "https://oriana-ai-ai-voice-agentserver.onrender.com"
export const CLIENT_URL = "https://oriana-ai.onrender.com"


const LoginPage = ({ setUser }) => (
  <Login
    setUser={setUser}
    firebaseConfigured={Boolean(import.meta.env.VITE_FIREBASE_API_KEY)}
  />
);

const Dashboard = ({ user, setUser, children }) => (
  <>
    <Navbar setUser={setUser} user={user} />
    {children}
  </>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(ServerUrl + "/api/user/current-user", {
          withCredentials: true,
          timeout: 5000,
        });
        setUser(res.data);
      } catch {
        // A visitor without a session stays on the login page.
        console.info("No active session found.");
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-[#f8f8fc]">
          <div className="w-8 h-8 border-4 border-b-blue-950 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage setUser={setUser} />}
        />
        <Route
          path="/"
          element={
            user ? (
              <Dashboard user={user} setUser={setUser}>
                <Home user={user} />
              </Dashboard>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/builder"
          element={
            user ? (
              <Dashboard user={user} setUser={setUser}>
                <Builder user={user} setUser={setUser} />
              </Dashboard>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/billing"
          element={
            user ? (
              <Dashboard user={user} setUser={setUser}>
                <Billing user={user} setUser={setUser} />
              </Dashboard>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
};

export default App;
