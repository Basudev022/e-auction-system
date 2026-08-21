import { useEffect, useState } from "react";
import Icon from "../Icon/Icon";
import "./Header.css";

export default function Header() {
  const [activeLink, setActiveLink] = useState("Home");

  const [location, setLocation] = useState({
    code: "--",
    name: "Locating...",
    flag: "",
  });

  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const handleCategorySelect = (category) => {
    if (category === "All Categories") {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }

    setShowCategories(false);
  };

  return (
    <header className="header page-container">
      <a href="/" className="brand">
        <div className="brand-mark">
          <Icon name="hammer" size={25} />
        </div>

        <div>
          <div className="brand-name">
            <span>e</span>Auction
          </div>

          <div className="brand-tag">Bid More, Win More</div>
        </div>
      </a>

      <div className="search-wrap">
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

          <button aria-label="Search" type="button">
            <Icon name="search" size={19} />
          </button>
        </div>
      </div>

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

      <nav className="nav-links">
        <a
          href="/"
          className={`nav-link ${activeLink === "Home" ? "active" : ""}`}
          onClick={() => setActiveLink("Home")}
        >
          Home
        </a>

        <a
          href="/auctions"
          className={`nav-link ${activeLink === "Auctions" ? "active" : ""}`}
          onClick={() => setActiveLink("Auctions")}
        >
          Auctions
        </a>

        <a
          href="/how-it-works"
          className={`nav-link ${
            activeLink === "How It Works" ? "active" : ""
          }`}
          onClick={() => setActiveLink("How It Works")}
        >
          How It Works
        </a>

        <a
          href="/support"
          className={`nav-link ${
            activeLink === "FAQ & Support" ? "active" : ""
          }`}
          onClick={() => setActiveLink("FAQ & Support")}
        >
          FAQ &amp; Support
        </a>
      </nav>

      <button className="login-btn" type="button">
        Login
      </button>
    </header>
  );
}
