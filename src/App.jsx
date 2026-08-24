import { useState } from "react";

import AuthPage from "./pages/Auth/AuthPage";
import Home from "./pages/Home/Home";

export default function App() {
  const [showAuth, setShowAuth] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ==========================================
  // OPEN LOGIN / REGISTER POPUP
  // ==========================================

  const handleOpenAuth = () => {
    setShowAuth(true);
  };

  // ==========================================
  // CLOSE LOGIN / REGISTER POPUP
  // ==========================================

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  // ==========================================
  // LOGIN SUCCESS
  // ==========================================

  const handleLoginSuccess = (userData) => {
    console.log("User logged in:", userData);

    /*
     * Redux has already stored:
     *
     * token
     * user
     * isAuthenticated
     *
     * Here we only update the
     * application-level UI.
     */

    setIsLoggedIn(true);

    setShowAuth(false);
  };

  return (
    <>
      {/* ========================================
          HOME PAGE
      ======================================== */}

      <Home onLogin={handleOpenAuth} />

      {/* ========================================
          AUTH POPUP
      ======================================== */}

      {showAuth && (
        <AuthPage
          onClose={handleCloseAuth}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}
