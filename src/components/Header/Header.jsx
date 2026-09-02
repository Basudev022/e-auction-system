import { useEffect, useState } from "react";

import { getCurrentUser } from "../../api/user/userApi";
import Icon from "../Icon/Icon";
import SellerVerificationModal from "../Seller/SellerVerificationModal";

import "./Header.css";

export default function Header({ onLogin, onLogout, dashboardMode = false }) {
  const [activeLink, setActiveLink] = useState("Home");

  const [location, setLocation] = useState({
    code: "--",
    name: "Locating...",
    flag: "",
  });

  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [showSellerModal, setShowSellerModal] = useState(false);

  const [userName, setUserName] = useState("User");

  // ==========================================
  // CATEGORIES
  // ==========================================

  const categories = [
    "All Categories",
    "Electronics",
    "Vehicles",
    "Property",
    "Furniture",
    "Fashion",
    "Jewelry",
    "Industrial Equipment",
    "Agriculture",
  ];

  // ==========================================
  // GET LOGGED-IN USER
  // DASHBOARD ONLY
  // ==========================================

  useEffect(() => {
    if (!dashboardMode) return;

    getCurrentUser()
      .then((user) => {
        if (user?.name) {
          setUserName(user.name);
        }
      })
      .catch(() => {
        setUserName("User");
      });
  }, [dashboardMode]);

  // ==========================================
  // GET USER LOCATION
  // ==========================================

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Location request failed");
        }

        return response.json();
      })
      .then((data) => {
        if (data.country_code && data.country_name) {
          const countryCode = data.country_code.toLowerCase();

          setLocation({
            code: data.country_code,
            name: data.country_name,
            flag: `https://flagcdn.com/w40/${countryCode}.png`,
          });
        }
      })
      .catch(() => {
        setLocation({
          code: "--",
          name: "Unknown",
          flag: "",
        });
      });
  }, []);

  // ==========================================
  // CATEGORY SELECT
  // ==========================================

  const handleCategorySelect = (category) => {
    if (category === "All Categories") {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }

    setShowCategories(false);
  };

  // ==========================================
  // NAVIGATION
  // ==========================================

  const handleNavClick = (link) => {
    setActiveLink(link);
  };

  // ==========================================
  // PROFILE MENU
  // ==========================================

  const handleProfileClick = () => {
    setShowProfileMenu((previous) => !previous);
  };

  const handleLogout = () => {
    setShowProfileMenu(false);

    if (onLogout) {
      onLogout();
    }
  };

  // ==========================================
  // GET FIRST LETTER OF USER NAME
  // ==========================================

  const userInitial = userName ? userName.charAt(0).toUpperCase() : "U";

  // ==========================================
  // BECOME A SELLER
  // ==========================================

  const handleBecomeSeller = () => {
    setShowSellerModal(true);
  };

  const handleCloseSellerModal = () => {
    setShowSellerModal(false);
  };

  return (
    <header className="header page-container">
      {/* ========================================
          BRAND
      ======================================== */}

      <a href="/" className="brand" onClick={() => handleNavClick("Home")}>
        <div className="brand-mark">
          <Icon name="hammer" size={25} />
        </div>

        <div>
          <div className="brand-name">
            <span>e</span>
            Auction
          </div>

          <div className="brand-tag">Bid More, Win More</div>
        </div>
      </a>

      {/* ========================================
          SEARCH
      ======================================== */}

      <div className="search-wrap">
        {/* CATEGORY */}

        <div className="category-wrapper">
          <button
            className="menu-circle"
            aria-label="Categories"
            type="button"
            onClick={() => setShowCategories(!showCategories)}
          >
            <Icon name="menu" size={18} />
          </button>

          {showCategories && (
            <div className="category-menu">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`category-option ${
                    selectedCategory === category ? "selected" : ""
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SEARCH BOX */}

        <div className="search-box">
          <input
            type="text"
            placeholder={
              selectedCategory
                ? `Search Products of ${selectedCategory}`
                : "Search Auctions Here"
            }
            aria-label="Search auctions"
          />

          {/* Search icon remains inside the search bar */}
          <button aria-label="Search" type="button">
            <Icon name="search" size={19} />
          </button>
        </div>
      </div>

      {/* ========================================
          LOCATION
      ======================================== */}

      <div className="location-wrapper">
        <div className="location-display">
          <div className="location-info">
            <span className="location-code">{location.code}</span>

            <span className="location-name">{location.name}</span>
          </div>

          {location.flag && (
            <img
              src={location.flag}
              alt={`${location.name} flag`}
              className="location-flag"
            />
          )}
        </div>
      </div>

      {/* ========================================
          BECOME A SELLER
          DASHBOARD ONLY
      ======================================== */}

      {dashboardMode && (
        <button
          type="button"
          className="seller-link"
          onClick={handleBecomeSeller}
        >
          Become A Seller
        </button>
      )}

      {/* ========================================
          NAVIGATION
          HOMEPAGE ONLY
      ======================================== */}

      {!dashboardMode && (
        <nav className="nav-links">
          <a
            href="/"
            className={`nav-link ${activeLink === "Home" ? "active" : ""}`}
            onClick={() => handleNavClick("Home")}
          >
            Home
          </a>

          <a
            href="/auctions"
            className={`nav-link ${activeLink === "Auctions" ? "active" : ""}`}
            onClick={() => handleNavClick("Auctions")}
          >
            Auctions
          </a>

          <a
            href="/how-it-works"
            className={`nav-link ${
              activeLink === "How It Works" ? "active" : ""
            }`}
            onClick={() => handleNavClick("How It Works")}
          >
            How It Works
          </a>

          <a
            href="/support"
            className={`nav-link ${
              activeLink === "FAQ & Support" ? "active" : ""
            }`}
            onClick={() => handleNavClick("FAQ & Support")}
          >
            FAQ &amp; Support
          </a>
        </nav>
      )}

      {/* ========================================
          SIGNUP / LOGIN
          HOMEPAGE ONLY
      ======================================== */}

      {!dashboardMode && (
        <button className="login-btn" type="button" onClick={onLogin}>
          SignUp/Login
        </button>
      )}

      {/* ========================================
          DASHBOARD PROFILE
          DASHBOARD ONLY
      ======================================== */}

      {dashboardMode && (
        <div className="profile-wrapper">
          <button
            className="profile-btn"
            type="button"
            onClick={handleProfileClick}
            aria-label="Profile menu"
          >
            {/* Actual user's first letter */}
            <span className="profile-avatar">{userInitial}</span>

            {/* Actual user's name */}
            <span className="profile-name">{userName}</span>

            {/* Arrow */}
            <span className="profile-arrow">{showProfileMenu ? "▲" : "▼"}</span>
          </button>

          {/* Profile dropdown */}
          {showProfileMenu && (
            <div className="profile-menu">
              <button
                type="button"
                className="profile-menu-item"
                onClick={() => setShowProfileMenu(false)}
              >
                Account Settings
              </button>

              <button
                type="button"
                className="profile-menu-item logout-item"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================
          SELLER VERIFICATION MODAL
          DASHBOARD ONLY
      ======================================== */}

      {dashboardMode && showSellerModal && (
        <SellerVerificationModal onClose={handleCloseSellerModal} />
      )}
    </header>
  );
}
