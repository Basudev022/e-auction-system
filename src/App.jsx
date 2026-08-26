import { useState } from "react";

import AuthPage from "./pages/Auth/AuthPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";

export default function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Open login/register popup
  const handleOpenAuth = () => {
    setShowAuth(true);
  };

  // Close login/register popup
  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  // Sign In clicked successfully
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowAuth(false);
  };

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Show dashboard after Sign In
  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <>
      <Home onLogin={handleOpenAuth} />

      {showAuth && (
        <AuthPage
          onClose={handleCloseAuth}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}
