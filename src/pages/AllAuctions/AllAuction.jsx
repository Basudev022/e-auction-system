import { useMemo, useState } from "react";
import watch from "../../assets/images/watch.png";
import AuctionCard from "../../components/AuctionCard/AuctionCard";
import "./AllAuction.css";

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

/* 20 items = exactly 4 pages when itemsPerPage = 5 */
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

export default function AllAuction() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [auctionType, setAuctionType] = useState("All Types");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);
  const [sortBy, setSortBy] = useState("Ending Soon");
  const [viewMode, setViewMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);

  // List view = 5 cards per page
  // Grid view = 6 cards per page (2 columns × 3 rows)
  const itemsPerPage = viewMode === "grid" ? 6 : 5;

  const handleCategoryChange = (category) => {
    setCurrentPage(1);
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setAuctionType("All Types");
    setMinPrice(0);
    setMaxPrice(10000000);
    setSortBy("Ending Soon");
    setCurrentPage(1);
  };

  const filteredAuctions = useMemo(() => {
    let result = [...auctions];

    if (search.trim()) {
      const value = search.toLowerCase().trim();

      result = result.filter(
        (auction) =>
          auction.title.toLowerCase().includes(value) ||
          auction.seller.toLowerCase().includes(value) ||
          auction.category.toLowerCase().includes(value),
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((auction) =>
        selectedCategories.includes(auction.category),
      );
    }

    result = result.filter(
      (auction) => auction.price >= minPrice && auction.price <= maxPrice,
    );

    if (auctionType !== "All Types") {
      result = result.filter((auction) => auction.type === auctionType);
    }

    const convertTime = (time) => {
      const match = time.match(/(\d+)h\s+(\d+)m\s+(\d+)s/);
      if (!match) return Infinity;

      const [, hours, minutes, seconds] = match;
      return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
    };

    if (sortBy === "Ending Soon") {
      result.sort((a, b) => convertTime(a.timeLeft) - convertTime(b.timeLeft));
    }

    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [search, selectedCategories, minPrice, maxPrice, auctionType, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAuctions.length / itemsPerPage),
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;

  const currentAuctions = filteredAuctions.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const goToPage = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="all-auctions-page">
      <div className="all-auctions-container">
        <div className="auction-header">
          <h1>All Auctions</h1>
          <p>Discover and bid on amazing items.</p>
        </div>

        <div className="auction-toolbar">
          <div className="search-box">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder="Search auctions..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="Ending Soon">Sort by: Ending Soon</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
          </select>

          <div className="view-switcher">
            <button
              type="button"
              className={viewMode === "list" ? "active" : ""}
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              ▤
            </button>

            <button
              type="button"
              className={viewMode === "grid" ? "active" : ""}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              ▦
            </button>
          </div>
        </div>

        <div className="auction-main">
          <aside className="auction-sidebar">
            <div className="filter-section">
              <h3>CATEGORIES</h3>

              <label className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedCategories.length === 0}
                  onChange={() => {
                    setSelectedCategories([]);
                    setCurrentPage(1);
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
                      setCurrentPage(1);
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
                      setCurrentPage(1);
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
                      setCurrentPage(1);
                    }}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>

            <button
              type="button"
              className="clear-filters-btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </aside>

          <section className="auction-results">
            {currentAuctions.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "auction-list grid-view"
                    : "auction-list"
                }
              >
                {currentAuctions.map((auction) => (
                  <AuctionCard
                    key={auction.id}
                    image={auction.image}
                    title={auction.title}
                    seller={auction.seller}
                    category={auction.category}
                    timeLeft={auction.timeLeft}
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

            <div className="auction-pagination">
              <span className="pagination-info">
                Showing {filteredAuctions.length === 0 ? 0 : startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, filteredAuctions.length)}{" "}
                of {filteredAuctions.length} auctions
              </span>

              <div className="pagination-buttons">
                <button
                  type="button"
                  disabled={safeCurrentPage === 1}
                  onClick={() => goToPage(safeCurrentPage - 1)}
                  aria-label="Previous page"
                >
                  ‹
                </button>

                {/* Always displays pages 1, 2, 3, 4 when all 20 items are visible. */}
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    type="button"
                    key={page}
                    className={safeCurrentPage === page ? "active" : ""}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={safeCurrentPage === totalPages}
                  onClick={() => goToPage(safeCurrentPage + 1)}
                  aria-label="Next page"
                >
                  ›
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
