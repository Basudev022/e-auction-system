import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AllAuction from "./pages/AllAuctions/AllAuction";
import AuthPage from "./pages/Auth/AuthPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import SellerDashboard from "./pages/SellerDashboard/SellerDashboard";

import { logout } from "./redux/slices/authSlice";

export default function App() {
  const dispatch = useDispatch();

  // ==========================================
  // AUTHENTICATION
  // ==========================================

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [showAuth, setShowAuth] = useState(false);

  // ==========================================
  // PAGE STATE
  // ==========================================

  const [currentPage, setCurrentPage] = useState("home");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isSeller, setIsSeller] = useState(
    localStorage.getItem("isSeller") === "true",
  );

  // ==========================================
  // ACTIVE NAVIGATION
  // ==========================================

  const [activeNav, setActiveNav] = useState("Home");

  // ==========================================
  // OPEN LOGIN
  // ==========================================

  const handleOpenAuth = () => {
    setShowAuth(true);
  };

  // ==========================================
  // CLOSE LOGIN
  // ==========================================

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  // ==========================================
  // LOGIN SUCCESS
  // ==========================================

  const handleLoginSuccess = (loginType) => {
    setShowAuth(false);

    localStorage.setItem("loginType", loginType);

    // ==========================================
    // BUYER LOGIN
    // ==========================================

    if (loginType === "buyer") {
      setCurrentPage("dashboard");
      setActiveNav("");
      return;
    }

    // ==========================================
    // SELLER LOGIN
    // ==========================================

    if (loginType === "seller") {
      setCurrentPage("seller-dashboard");
      setActiveNav("");
    }
  };

  // ==========================================
  // SELLER VERIFICATION SUCCESS
  // ==========================================

  const handleSellerVerificationSuccess = () => {
    setIsSeller(true);

    localStorage.setItem("isSeller", "true");

    setCurrentPage("home");
    setActiveNav("Home");

    setShowAuth(true);
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("loginType");
    localStorage.removeItem("isSeller");

    setIsSeller(false);

    setCurrentPage("home");
    setSelectedProduct(null);
    setActiveNav("Home");
    setShowAuth(false);
  };

  // ==========================================
  // VIEW ALL AUCTIONS
  // ==========================================

  const handleViewAllAuctions = () => {
    setActiveNav("Auctions");
    setCurrentPage("all-auctions");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // PRODUCT DETAILS
  // ==========================================

  const handleProductDetails = (product) => {
    setSelectedProduct(product);
    setCurrentPage("product-details");
    setActiveNav("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // GO HOME
  // ==========================================

  const handleHome = () => {
    setActiveNav("Home");
    setCurrentPage("home");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // GO TO DASHBOARD
  // ==========================================

  const handleDashboard = () => {
    setActiveNav("");

    setCurrentPage("dashboard");
    setShowAuth(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // HOW IT WORKS
  // ==========================================

  const handleHowItWorks = () => {
    setActiveNav("How It Works");

    setCurrentPage("home");

    setTimeout(() => {
      const section = document.getElementById("how-it-works");

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  // ==========================================
  // ACTIVE NAVIGATION CHANGE
  // ==========================================

  const handleActiveNavChange = (link) => {
    setActiveNav(link);
  };

  // ==========================================
  // SELLER DASHBOARD
  // ==========================================

  if (currentPage === "seller-dashboard") {
    return (
      <SellerDashboard
        onLogout={handleLogout}
        onDashboard={handleDashboard}
        onHome={handleHome}
        onViewAllAuctions={handleViewAllAuctions}
        onHowItWorks={handleHowItWorks}
      />
    );
  }

  // ==========================================
  // BUYER DASHBOARD
  // ==========================================

  if (currentPage === "dashboard") {
    return (
      <Dashboard
        onLogout={handleLogout}
        onSellerVerified={handleSellerVerificationSuccess}
        isSeller={isSeller}
        isLoggedIn={isAuthenticated}
        user={user}
        onDashboard={handleDashboard}
        onHome={handleHome}
        onViewAllAuctions={handleViewAllAuctions}
        onHowItWorks={handleHowItWorks}
        activeLink={activeNav}
        onActiveLinkChange={handleActiveNavChange}
      />
    );
  }

  // ==========================================
  // PRODUCT DETAILS
  // ==========================================

  if (currentPage === "product-details") {
    return (
      <ProductDetails
        product={selectedProduct}
        onLogin={handleOpenAuth}
        onLogout={handleLogout}
        isLoggedIn={isAuthenticated}
        user={user}
        onDashboard={handleDashboard}
        onViewAllAuctions={handleViewAllAuctions}
        onProductDetails={handleProductDetails}
        onHome={handleHome}
        onHowItWorks={handleHowItWorks}
        activeNav={activeNav}
        onActiveLinkChange={handleActiveNavChange}
      />
    );
  }

  // ==========================================
  // NORMAL WEBSITE PAGES
  // ==========================================

  return (
    <>
      {/* ========================================
          HOME
      ======================================== */}

      {currentPage === "home" && (
        <Home
          onLogin={handleOpenAuth}
          onLogout={handleLogout}
          isLoggedIn={isAuthenticated}
          user={user}
          onDashboard={handleDashboard}
          onViewAllAuctions={handleViewAllAuctions}
          onProductDetails={handleProductDetails}
          onHome={handleHome}
          onHowItWorks={handleHowItWorks}
          activeNav={activeNav}
          onActiveLinkChange={handleActiveNavChange}
        />
      )}

      {/* ========================================
          ALL AUCTIONS
      ======================================== */}

      {currentPage === "all-auctions" && (
        <AllAuction
          onLogin={handleOpenAuth}
          onLogout={handleLogout}
          isLoggedIn={isAuthenticated}
          user={user}
          onDashboard={handleDashboard}
          onHome={handleHome}
          onViewAllAuctions={handleViewAllAuctions}
          onProductDetails={handleProductDetails}
          onHowItWorks={handleHowItWorks}
          activeNav={activeNav}
          onActiveLinkChange={handleActiveNavChange}
        />
      )}

      {/* ========================================
          AUTH
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
