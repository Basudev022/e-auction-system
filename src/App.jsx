import { useState } from "react";

import AuthPage from "./pages/Auth/AuthPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import AllAuction from "./pages/AllAuctions/AllAuction";

export default function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  const handleOpenAuth = () => {
    setShowAuth(true);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  const handleViewAllAuctions = () => {
    setCurrentPage("all-auctions");
  };

  if (isLoggedIn) {
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <>
      {currentPage === "home" && (
        <Home
          onLogin={handleOpenAuth}
          onViewAllAuctions={handleViewAllAuctions}
        />
      )}

      {currentPage === "all-auctions" && (
        <AllAuction />
      )}

      {showAuth && (
        <AuthPage
          onClose={handleCloseAuth}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}
