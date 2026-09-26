import { useMemo, useState } from "react";

import watch from "../../assets/images/watch.png";
import AuctionCard from "../../components/AuctionCard/AuctionCard";
import Header from "../../components/Header/Header";

import "./AllAuction.css";

/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  { name: "Electronics", count: 128 },
  { name: "Vehicles", count: 86 },
  { name: "Real Estate", count: 19 },
  { name: "Art & Collectibles", count: 64 },
  { name: "Jewelry & Watches", count: 89 },
  { name: "Furniture", count: 47 },
  { name: "Fashion", count: 53 },
  { name: "Sports", count: 31 },
  { name: "Books & Media", count: 28 },
];

/* =========================================================
   AUCTIONS
========================================================= */

const auctions = [
  {
    id: 1,
    image: watch,
    title: "Rolex Submariner Date",
    seller: "Luxury Watches",
    category: "Jewelry & Watches",
    timeLeft: "02h 15m 30s",
    price: 850000,
    type: "Live Auctions",
  },
  {
    id: 2,
    image: watch,
    title: "2022 Tesla Model 3",
    seller: "Premium Motors",
    category: "Vehicles",
    timeLeft: "01h 45m 22s",
    price: 2445000,
    type: "Live Auctions",
  },
  {
    id: 3,
    image: watch,
    title: "Vintage Landscape Painting",
    seller: "Art Gallery",
    category: "Art & Collectibles",
    timeLeft: "00h 30m 10s",
    price: 25500,
    type: "Ending Soon",
  },
  {
    id: 4,
    image: watch,
    title: "Canon EOS R5 Camera",
    seller: "Camera World",
    category: "Electronics",
    timeLeft: "02h 35m 45s",
    price: 125000,
    type: "Live Auctions",
  },
  {
    id: 5,
    image: watch,
    title: "Diamond Necklace",
    seller: "Royal Jewellers",
    category: "Jewelry & Watches",
    timeLeft: "01h 05m 50s",
    price: 325000,
    type: "Ending Soon",
  },
  {
    id: 6,
    image: watch,
    title: "MacBook Pro M3",
    seller: "Tech Store",
    category: "Electronics",
    timeLeft: "03h 20m 15s",
    price: 175000,
    type: "Live Auctions",
  },
  {
    id: 7,
    image: watch,
    title: "BMW X5 2023",
    seller: "Auto World",
    category: "Vehicles",
    timeLeft: "04h 12m 32s",
    price: 6850000,
    type: "Upcoming Auctions",
  },
  {
    id: 8,
    image: watch,
    title: "Modern Abstract Art",
    seller: "Modern Art House",
    category: "Art & Collectibles",
    timeLeft: "00h 42m 18s",
    price: 78000,
    type: "Ending Soon",
  },
  {
    id: 9,
    image: watch,
    title: "Luxury Leather Sofa",
    seller: "Home Interiors",
    category: "Furniture",
    timeLeft: "05h 10m 05s",
    price: 95000,
    type: "Live Auctions",
  },
  {
    id: 10,
    image: watch,
    title: "Premium Sports Watch",
    seller: "Watch House",
    category: "Jewelry & Watches",
    timeLeft: "01h 50m 40s",
    price: 185000,
    type: "Live Auctions",
  },
  {
    id: 11,
    image: watch,
    title: "Sony Alpha A7 IV",
    seller: "Digital Hub",
    category: "Electronics",
    timeLeft: "06h 15m 20s",
    price: 145000,
    type: "Upcoming Auctions",
  },
  {
    id: 12,
    image: watch,
    title: "Honda Civic 2021",
    seller: "City Motors",
    category: "Vehicles",
    timeLeft: "07h 25m 12s",
    price: 1120000,
    type: "Upcoming Auctions",
  },
  {
    id: 13,
    image: watch,
    title: "Antique Wooden Chair",
    seller: "Classic Furniture",
    category: "Furniture",
    timeLeft: "02h 48m 35s",
    price: 42000,
    type: "Live Auctions",
  },
  {
    id: 14,
    image: watch,
    title: "Gold Chain 22K",
    seller: "Golden Palace",
    category: "Jewelry & Watches",
    timeLeft: "03h 05m 44s",
    price: 210000,
    type: "Live Auctions",
  },
  {
    id: 15,
    image: watch,
    title: "Rare First Edition Book",
    seller: "Book Collectors",
    category: "Books & Media",
    timeLeft: "00h 55m 28s",
    price: 18500,
    type: "Ending Soon",
  },
  {
    id: 16,
    image: watch,
    title: "Designer Leather Jacket",
    seller: "Fashion House",
    category: "Fashion",
    timeLeft: "08h 10m 18s",
    price: 35000,
    type: "Upcoming Auctions",
  },
  {
    id: 17,
    image: watch,
    title: "Professional Football Kit",
    seller: "Sports World",
    category: "Sports",
    timeLeft: "05h 40m 05s",
    price: 22000,
    type: "Live Auctions",
  },
  {
    id: 18,
    image: watch,
    title: "Modern Apartment",
    seller: "Prime Properties",
    category: "Real Estate",
    timeLeft: "12h 20m 30s",
    price: 8500000,
    type: "Upcoming Auctions",
  },
  {
    id: 19,
    image: watch,
    title: "iPhone 17 Pro Max",
    seller: "Mobile Store",
    category: "Electronics",
    timeLeft: "01h 25m 10s",
    price: 145000,
    type: "Ending Soon",
  },
  {
    id: 20,
    image: watch,
    title: "Royal Dining Table",
    seller: "Home Gallery",
    category: "Furniture",
    timeLeft: "09h 35m 22s",
    price: 115000,
    type: "Upcoming Auctions",
  },
];

/* =========================================================
   ALL AUCTIONS
========================================================= */

export default function AllAuction({
  onLogin,
  onLogout,
  isLoggedIn,
  user,
  onDashboard,
  onHome,
  onViewAllAuctions,
  onProductDetails,
  onHowItWorks,
  activeNav,
  onActiveLinkChange,
}) {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [auctionType, setAuctionType] = useState("All Types");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);

  /* =========================================================
     CATEGORY FILTER
  ========================================================= */

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  };

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setAuctionType("All Types");
    setMinPrice(0);
    setMaxPrice(10000000);
  };

  /* =========================================================
     FILTER + SORT
  ========================================================= */

  const filteredAuctions = useMemo(() => {
    let result = [...auctions];

    /* SEARCH */

    if (search.trim()) {
      const value = search.toLowerCase().trim();

      result = result.filter(
        (auction) =>
          auction.title.toLowerCase().includes(value) ||
          auction.seller.toLowerCase().includes(value) ||
          auction.category.toLowerCase().includes(value),
      );
    }

    /* CATEGORY */

    if (selectedCategories.length > 0) {
      result = result.filter((auction) =>
        selectedCategories.includes(auction.category),
      );
    }

    /* PRICE */

    result = result.filter(
      (auction) => auction.price >= minPrice && auction.price <= maxPrice,
    );

    /* AUCTION TYPE */

    if (auctionType !== "All Types") {
      result = result.filter((auction) => auction.type === auctionType);
    }

    /* TIME CONVERTER */

    const convertTime = (time) => {
      const match = time.match(/(\d+)h\s+(\d+)m\s+(\d+)s/);

      if (!match) return Infinity;

      const [, hours, minutes, seconds] = match;

      return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
    };

    return result;
  }, [search, selectedCategories, minPrice, maxPrice, auctionType]);

  /* =========================================================
     ALL FILTERED AUCTIONS
  ========================================================= */

  const currentAuctions = filteredAuctions;

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <>
      <Header
        onLogin={onLogin}
        onLogout={onLogout}
        isLoggedIn={isLoggedIn}
        user={user}
        onDashboard={onDashboard}
        onHome={onHome}
        onViewAllAuctions={onViewAllAuctions}
        onHowItWorks={onHowItWorks}
        activeLink={activeNav || "Auctions"}
        onActiveLinkChange={onActiveLinkChange}
      />

      <div className="all-auctions-page">
        <div className="all-auctions-container">
          <div className="auction-main">
            {/* =================================================
                LEFT FILTER SIDEBAR
            ================================================= */}

            <aside className="auction-sidebar">
              {/* CATEGORIES */}

              <div className="filter-section">
                <h3>CATEGORIES</h3>

                <label className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedCategories.length === 0}
                    onChange={() => {
                      setSelectedCategories([]);
                    }}
                  />

                  <span className="category-name">All Categories</span>
                </label>

                {categories.map((category) => (
                  <label className="filter-checkbox" key={category.name}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.name)}
                      onChange={() => handleCategoryChange(category.name)}
                    />

                    <span className="category-name">{category.name}</span>

                    <span className="category-count">{category.count}</span>
                  </label>
                ))}
              </div>

              {/* PRICE RANGE */}

              <div className="filter-section">
                <h3>PRICE RANGE</h3>

                <div className="range-wrapper">
                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="5000"
                    value={minPrice}
                    onChange={(e) => {
                      const value = Number(e.target.value);

                      if (value <= maxPrice) {
                        setMinPrice(value);
                      }
                    }}
                    className="range-input"
                  />

                  <input
                    type="range"
                    min="0"
                    max="10000000"
                    step="5000"
                    value={maxPrice}
                    onChange={(e) => {
                      const value = Number(e.target.value);

                      if (value >= minPrice) {
                        setMaxPrice(value);
                      }
                    }}
                    className="range-input"
                  />
                </div>

                <div className="price-labels">
                  <span>Min</span>
                  <span>Max</span>
                </div>
              </div>

              {/* AUCTION TYPE */}

              <div className="filter-section">
                <h3>AUCTION TYPE</h3>

                {[
                  "All Types",
                  "Live Auctions",
                  "Upcoming Auctions",
                  "Ending Soon",
                ].map((type) => (
                  <label className="radio-option" key={type}>
                    <input
                      type="radio"
                      name="auctionType"
                      value={type}
                      checked={auctionType === type}
                      onChange={(e) => {
                        setAuctionType(e.target.value);
                      }}
                    />

                    <span>{type}</span>
                  </label>
                ))}
              </div>

              {/* CLEAR FILTERS */}

              <button
                type="button"
                className="clear-filters-btn"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </aside>

            {/* =================================================
                AUCTION RESULTS
            ================================================= */}

            <section className="auction-results">
              {currentAuctions.length > 0 ? (
                <div className="auction-list">
                  {currentAuctions.map((auction) => (
                    <AuctionCard
                      key={auction.id}
                      image={auction.image}
                      title={auction.title}
                      seller={auction.seller}
                      category={auction.category}
                      timeLeft={auction.timeLeft}
                      onProductClick={onProductDetails}
                    />
                  ))}
                </div>
              ) : (
                <div className="no-auctions">
                  <h3>No auctions found</h3>

                  <p>Try changing your search or filter options.</p>

                  <button type="button" onClick={clearFilters}>
                    Clear Filters
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
