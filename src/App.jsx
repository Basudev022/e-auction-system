import { useState } from "react";
import { useDispatch } from "react-redux";

import AllAuction from "./pages/AllAuctions/AllAuction";
import AuthPage from "./pages/Auth/AuthPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";

import { logout } from "./redux/slices/authSlice";

export default function App() {
  const dispatch = useDispatch();

  /*
   * =========================
   * LOCAL UI STATE
   * =========================
   */

  const [showAuth, setShowAuth] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  /*
   * =========================
   * AUTH MODAL
   * =========================
   */

  const handleOpenAuth = () => {
    setShowAuth(true);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  /*
   * =========================
   * LOGIN SUCCESS
   * =========================
   *
   * After successful login:
   * Home -> Dashboard
   */

  const handleLoginSuccess = () => {
    setShowAuth(false);
    setCurrentPage("dashboard");
  };

  /*
   * =========================
   * LOGOUT
   * =========================
   *
   * Dashboard -> Home
   */

  const handleLogout = () => {
    dispatch(logout());

    setCurrentPage("home");
    setShowAuth(false);
  };

  /*
   * =========================
   * ALL AUCTIONS
   * =========================
   */

  const handleViewAllAuctions = () => {
    setCurrentPage("all-auctions");
  };

  /*
   * =========================
   * DASHBOARD
   * =========================
   *
   * Dashboard is displayed only
   * when currentPage is explicitly
   * changed to "dashboard".
   *
   * Therefore, when npm run dev
   * starts the application, the
   * initial page remains Home.
   */

  if (currentPage === "dashboard") {
    return <Dashboard onLogout={handleLogout} />;
  }

  /*
   * =========================
   * HOME / AUCTIONS / AUTH
   * =========================
   */

  return (
    <>
      {currentPage === "home" && (
        <Home
          onLogin={handleOpenAuth}
          onViewAllAuctions={handleViewAllAuctions}
        />
      )}

      {currentPage === "all-auctions" && <AllAuction />}

      {showAuth && (
        <AuthPage
          onClose={handleCloseAuth}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}
