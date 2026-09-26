import { useEffect, useState } from "react";

import AuctionCard from "../../components/AuctionCard/AuctionCard";
import Footer from "../../components/FooterBanner/FooterBanner";
import Header from "../../components/Header/Header";

import frame from "../../assets/images/frame.png";
import painting1 from "../../assets/images/painting1.png";
import painting2 from "../../assets/images/painting2.png";
import watch from "../../assets/images/watch.png";

import "./ProductDetails.css";

export default function ProductDetails({
  product,
  onLogin,
  onLogout,
  isLoggedIn,
  user,
  onDashboard,
  onViewAllAuctions,
  onProductDetails,
  onHome,
  onHowItWorks,
  activeNav,
  onActiveLinkChange,
}) {
  /* =========================================================
     SELECTED PRODUCT
  ========================================================= */

  const selectedProduct = product || {
    image: watch,
    title: "Omega Vintage Leather Watch",
    seller: "John Doe",
    category: "Watches",
    timeLeft: "2h 15m",
    remainingSeconds: 8100,
    imageCount: 5,
    verified: true,
  };

  /* =========================================================
     PRODUCT IMAGES
  ========================================================= */

  const productImages = [
    selectedProduct.image || watch,
    painting1,
    painting2,
    frame,
    selectedProduct.image || watch,
  ];

  const [selectedImage, setSelectedImage] = useState(0);

  /* =========================================================
     TAB
  ========================================================= */

  const [activeTab, setActiveTab] = useState("description");

  /* =========================================================
     CONVERT TIME LEFT INTO SECONDS
  ========================================================= */

  const getSecondsFromTime = (value) => {
    if (typeof value === "number") {
      return Math.max(0, value);
    }

    const valueText = String(value || "")
      .toLowerCase()
      .trim();

    const hours = Number(valueText.match(/(\d+)\s*h/)?.[1] || 0);

    const minutes = Number(valueText.match(/(\d+)\s*m/)?.[1] || 0);

    const seconds = Number(valueText.match(/(\d+)\s*s/)?.[1] || 0);

    return hours * 3600 + minutes * 60 + seconds;
  };

  /* =========================================================
     INITIAL COUNTDOWN
  ========================================================= */

  const initialSeconds =
    typeof selectedProduct.remainingSeconds === "number"
      ? selectedProduct.remainingSeconds
      : getSecondsFromTime(selectedProduct.timeLeft);

  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

  /* =========================================================
     RESET PRODUCT VIEW WHEN A NEW PRODUCT IS SELECTED
  ========================================================= */

  useEffect(() => {
    setSelectedImage(0);
    setActiveTab("description");
    setRemainingSeconds(initialSeconds);
  }, [product, initialSeconds]);

  /* =========================================================
     REAL-TIME COUNTDOWN
  ========================================================= */

  useEffect(() => {
    if (remainingSeconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setRemainingSeconds((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [remainingSeconds]);

  /* =========================================================
     COUNTDOWN DISPLAY
  ========================================================= */

  const hours = Math.floor(remainingSeconds / 3600);

  const minutes = Math.floor((remainingSeconds % 3600) / 60);

  const seconds = remainingSeconds % 60;

  const formatTime = (value) => String(value).padStart(2, "0");

  /* =========================================================
     SIMILAR AUCTIONS
  ========================================================= */

  const allSimilarAuctions = [
    {
      image: painting1,
      title: "Modern Art Painting",
      seller: "Emma Thompson",
      category: "Art",
      timeLeft: "5h 30m",
    },

    {
      image: painting2,
      title: "Classic Oil Painting",
      seller: "Michael Anderson",
      category: "Art",
      timeLeft: "3h 20m",
    },

    {
      image: frame,
      title: "Antique Wooden Frame",
      seller: "Robert Wilson",
      category: "Antiques",
      timeLeft: "4h 10m",
    },

    {
      image: watch,
      title: "Luxury Vintage Watch",
      seller: "James Miller",
      category: "Watches",
      timeLeft: "6h 15m",
    },

    {
      image: frame,
      title: "Decorative Antique Frame",
      seller: "David Samson",
      category: "Antiques",
      timeLeft: "7h 05m",
    },
  ];

  const similarAuctions = [
    ...allSimilarAuctions.filter(
      (auction) =>
        auction.category === selectedProduct.category &&
        auction.title !== selectedProduct.title,
    ),
    ...allSimilarAuctions.filter(
      (auction) =>
        auction.category !== selectedProduct.category &&
        auction.title !== selectedProduct.title,
    ),
  ].slice(0, 5);

  /* =========================================================
     SELLER INITIAL
  ========================================================= */

  const sellerInitial =
    selectedProduct.seller?.trim()?.charAt(0)?.toUpperCase() || "S";

  /* =========================================================
     TAB CONTENT
  ========================================================= */

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <div className="product-tab-panel">
            <h2>Product Details</h2>

            <div className="product-details-grid">
              <div className="product-detail-row">
                <span>Category</span>
                <strong>{selectedProduct.category}</strong>
              </div>

              <div className="product-detail-row">
                <span>Condition</span>
                <strong>Excellent</strong>
              </div>

              <div className="product-detail-row">
                <span>Brand</span>
                <strong>Omega</strong>
              </div>

              <div className="product-detail-row">
                <span>Model</span>
                <strong>Vintage Leather Watch</strong>
              </div>

              <div className="product-detail-row">
                <span>Material</span>
                <strong>Stainless Steel</strong>
              </div>

              <div className="product-detail-row">
                <span>Movement</span>
                <strong>Automatic</strong>
              </div>

              <div className="product-detail-row">
                <span>Year</span>
                <strong>1960</strong>
              </div>

              <div className="product-detail-row">
                <span>Height</span>
                <strong>12 cm</strong>
              </div>

              <div className="product-detail-row">
                <span>Width</span>
                <strong>5 cm</strong>
              </div>

              <div className="product-detail-row">
                <span>Weight</span>
                <strong>450 g</strong>
              </div>
            </div>
          </div>
        );

      case "shipping":
        return (
          <div className="product-tab-panel">
            <h2>Shipping Information</h2>

            <div className="product-shipping-list">
              <div className="product-shipping-row">
                <span>Shipping Method</span>
                <strong>Standard Delivery</strong>
              </div>

              <div className="product-shipping-row">
                <span>Estimated Delivery</span>
                <strong>5–7 Business Days</strong>
              </div>

              <div className="product-shipping-row">
                <span>Shipping Location</span>
                <strong>Bhubaneswar, Odisha</strong>
              </div>

              <div className="product-shipping-row">
                <span>Delivery Available</span>
                <strong>Pan India</strong>
              </div>

              <div className="product-shipping-row">
                <span>Shipping Cost</span>
                <strong>Free</strong>
              </div>

              <div className="product-shipping-row">
                <span>Packaging</span>
                <strong>Secure Protective Packaging</strong>
              </div>
            </div>

            <div className="product-shipping-notes">
              <div>
                <span>✓</span>
                <p>Item will be securely packaged</p>
              </div>

              <div>
                <span>✓</span>
                <p>Tracking information will be provided</p>
              </div>

              <div>
                <span>✓</span>
                <p>Buyer will receive delivery updates</p>
              </div>
            </div>
          </div>
        );

      case "seller":
        return (
          <div className="product-tab-panel">
            <h2>Seller Information</h2>

            <div className="seller-info-profile">
              <div className="seller-info-avatar">{sellerInitial}</div>

              <div className="seller-info-name">
                <h3>{selectedProduct.seller}</h3>

                <span>✓ Verified Seller</span>
              </div>
            </div>

            <div className="seller-info-grid">
              <div className="seller-info-row">
                <span>Seller Rating</span>
                <strong>★ 4.8 / 5</strong>
              </div>

              <div className="seller-info-row">
                <span>Total Auctions</span>
                <strong>128</strong>
              </div>

              <div className="seller-info-row">
                <span>Successful Sales</span>
                <strong>115</strong>
              </div>

              <div className="seller-info-row">
                <span>Member Since</span>
                <strong>January 2022</strong>
              </div>

              <div className="seller-info-row">
                <span>Location</span>
                <strong>Bhubaneswar, Odisha</strong>
              </div>

              <div className="seller-info-row">
                <span>Response Rate</span>
                <strong>98%</strong>
              </div>

              <div className="seller-info-row">
                <span>Positive Feedback</span>
                <strong>96%</strong>
              </div>
            </div>
          </div>
        );

      case "reviews":
        return (
          <div className="product-tab-panel">
            <h2>Customer Reviews</h2>

            <div className="reviews-summary">
              <div className="reviews-score">
                <strong>4.8</strong>
                <div className="reviews-stars">★★★★★</div>
                <span>120 Reviews</span>
              </div>

              <div className="reviews-breakdown">
                <div>
                  <span>5 ★</span>
                  <div className="review-bar">
                    <span style={{ width: "80%" }}></span>
                  </div>
                  <strong>96</strong>
                </div>

                <div>
                  <span>4 ★</span>
                  <div className="review-bar">
                    <span style={{ width: "50%" }}></span>
                  </div>
                  <strong>18</strong>
                </div>

                <div>
                  <span>3 ★</span>
                  <div className="review-bar">
                    <span style={{ width: "25%" }}></span>
                  </div>
                  <strong>4</strong>
                </div>

                <div>
                  <span>2 ★</span>
                  <div className="review-bar">
                    <span style={{ width: "10%" }}></span>
                  </div>
                  <strong>1</strong>
                </div>

                <div>
                  <span>1 ★</span>
                  <div className="review-bar">
                    <span style={{ width: "10%" }}></span>
                  </div>
                  <strong>1</strong>
                </div>
              </div>
            </div>

            <div className="customer-reviews">
              <div className="customer-review">
                <div className="customer-review-header">
                  <strong>Rahul Sharma</strong>
                  <span>2 days ago</span>
                </div>

                <div className="customer-review-stars">★★★★★</div>

                <p>Excellent product and very smooth auction.</p>
              </div>

              <div className="customer-review">
                <div className="customer-review-header">
                  <strong>Priya Das</strong>
                  <span>1 week ago</span>
                </div>

                <div className="customer-review-stars">★★★★☆</div>

                <p>Item was exactly as described.</p>
              </div>

              <div className="customer-review">
                <div className="customer-review-header">
                  <strong>Amit Kumar</strong>
                  <span>2 weeks ago</span>
                </div>

                <div className="customer-review-stars">★★★★★</div>

                <p>Very good seller and secure packaging.</p>
              </div>
            </div>
          </div>
        );

      case "description":
      default:
        return (
          <div className="product-tab-panel">
            <h2>Product Description</h2>

            <p>
              {selectedProduct.title} is a verified item available for auction.
              Review the available information carefully before registering for
              this auction.
            </p>

            <p>
              Whether you are a collector, enthusiast, or looking for something
              unique, this auction gives you the opportunity to participate and
              acquire the item through a transparent bidding process.
            </p>

            <div className="product-features">
              <div>
                <span>✓</span>
                <p>Verified auction item</p>
              </div>

              <div>
                <span>✓</span>
                <p>Trusted seller</p>
              </div>

              <div>
                <span>✓</span>
                <p>Secure auction process</p>
              </div>

              <div>
                <span>✓</span>
                <p>Buyer protection available</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <Header
        onLogin={onLogin}
        onLogout={onLogout}
        isLoggedIn={isLoggedIn}
        user={user}
        onDashboard={onDashboard}
        onHome={onHome}
        onViewAllAuctions={onViewAllAuctions}
        onHowItWorks={onHowItWorks}
        activeLink={activeNav}
        onActiveLinkChange={onActiveLinkChange}
      />

      <main className="product-details-page">
        {/* ===================================================
            BREADCRUMB
        =================================================== */}

        <div className="product-breadcrumb">
          <button type="button" onClick={onHome}>
            Home
          </button>

          <span>›</span>

          <button type="button" onClick={onViewAllAuctions}>
            Auctions
          </button>

          <span>›</span>

          <span>{selectedProduct.category}</span>

          <span>›</span>

          <strong>{selectedProduct.title}</strong>
        </div>

        {/* ===================================================
            PRODUCT MAIN SECTION
        =================================================== */}

        <section className="product-main-section">
          {/* =================================================
              LEFT - IMAGE GALLERY
          ================================================= */}

          <div className="product-gallery">
            <div className="product-main-image-wrapper">
              <img
                src={productImages[selectedImage]}
                alt={selectedProduct.title}
                className="product-main-image"
              />

              <div className="product-verified-badge">
                <span>✓</span>
                <span>Verified Item</span>
              </div>

              <button
                type="button"
                className="product-gallery-arrow product-gallery-prev"
                onClick={() =>
                  setSelectedImage(
                    selectedImage === 0
                      ? productImages.length - 1
                      : selectedImage - 1,
                  )
                }
                aria-label="Previous image"
              >
                ‹
              </button>

              <button
                type="button"
                className="product-gallery-arrow product-gallery-next"
                onClick={() =>
                  setSelectedImage(
                    selectedImage === productImages.length - 1
                      ? 0
                      : selectedImage + 1,
                  )
                }
                aria-label="Next image"
              >
                ›
              </button>

              <div className="product-image-number">
                {selectedImage + 1} / {productImages.length}
              </div>
            </div>

            {/* THUMBNAILS */}

            <div className="product-thumbnails">
              {productImages.map((image, index) => (
                <button
                  type="button"
                  key={index}
                  className={`product-thumbnail ${
                    selectedImage === index ? "product-thumbnail-active" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`Product view ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* =================================================
              RIGHT - PRODUCT INFORMATION
          ================================================= */}

          <div className="product-information">
            <div className="product-category-tag">
              {selectedProduct.category}
            </div>

            <h1>{selectedProduct.title}</h1>

            <p className="product-short-description">
              Discover this verified auction item available through our trusted
              marketplace. Explore the product details and register to
              participate in the auction.
            </p>

            {/* SELLER */}

            <div className="product-seller-row">
              <div className="product-seller-avatar">{sellerInitial}</div>

              <div className="product-seller-details">
                <span>Seller</span>

                <strong>
                  {selectedProduct.seller} <small>✓</small>
                </strong>
              </div>

              <div className="product-seller-divider"></div>

              <div className="product-rating">
                <span className="rating-star">★</span>

                <div>
                  <strong>4.8</strong>
                  <span>(120 reviews)</span>
                </div>
              </div>
            </div>

            {/* =================================================
                PRICE / AUCTION CARD
            ================================================= */}

            <div className="product-auction-box">
              <div className="product-price-section">
                <span className="product-price-label">Base Price</span>

                <strong className="product-base-price">₹1,25,000</strong>

                <span className="product-price-note">
                  Starting price for this auction
                </span>
              </div>

              {/* REAL-TIME COUNTDOWN */}

              <div className="product-countdown-section">
                <span className="product-price-label">Time Left</span>

                <div className="product-countdown">
                  <div>
                    <strong>{formatTime(hours)}</strong>
                    <span>HH</span>
                  </div>

                  <b>:</b>

                  <div>
                    <strong>{formatTime(minutes)}</strong>
                    <span>MM</span>
                  </div>

                  <b>:</b>

                  <div>
                    <strong>{formatTime(seconds)}</strong>
                    <span>SS</span>
                  </div>
                </div>
              </div>

              {/* REGISTER */}

              <button
                type="button"
                className="register-now-button"
                onClick={onLogin}
              >
                <span className="register-icon">♙</span>

                <span>Register For This Auction</span>
              </button>

              <button type="button" className="watchlist-button">
                <span>♡</span>

                <span>Add to Watchlist</span>
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================
            LOWER PRODUCT CONTENT
        =================================================== */}

        <section className="product-lower-section">
          <div className="product-description-card">
            {/* =================================================
                TABS
            ================================================= */}

            <div className="product-tabs">
              <button
                type="button"
                className={`product-tab ${
                  activeTab === "description" ? "product-tab-active" : ""
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>

              <button
                type="button"
                className={`product-tab ${
                  activeTab === "details" ? "product-tab-active" : ""
                }`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>

              <button
                type="button"
                className={`product-tab ${
                  activeTab === "shipping" ? "product-tab-active" : ""
                }`}
                onClick={() => setActiveTab("shipping")}
              >
                Shipping
              </button>

              <button
                type="button"
                className={`product-tab ${
                  activeTab === "seller" ? "product-tab-active" : ""
                }`}
                onClick={() => setActiveTab("seller")}
              >
                Seller Info
              </button>

              <button
                type="button"
                className={`product-tab ${
                  activeTab === "reviews" ? "product-tab-active" : ""
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
            </div>

            {/* =================================================
                SCROLLABLE CONTENT
            ================================================= */}

            <div className="product-description-content">
              {renderTabContent()}
            </div>
          </div>

          {/* WHY REGISTER */}

          <aside className="product-trust-card">
            <h2>Why Register for This Item?</h2>

            <div className="product-trust-item">
              <div className="trust-icon">✓</div>

              <div>
                <h3>Authentic & Verified</h3>

                <p>All items are checked for authenticity.</p>
              </div>
            </div>

            <div className="product-trust-item">
              <div className="trust-icon">♙</div>

              <div>
                <h3>Unique Collectibles</h3>

                <p>Rare items you won't find elsewhere.</p>
              </div>
            </div>

            <div className="product-trust-item">
              <div className="trust-icon">✓</div>

              <div>
                <h3>Trusted Community</h3>

                <p>Register and participate with confidence.</p>
              </div>
            </div>

            <div className="product-trust-item">
              <div className="trust-icon">♙</div>

              <div>
                <h3>Unique Collectibles</h3>

                <p>Rare items you won't find elsewhere.</p>
              </div>
            </div>

            <div className="product-trust-item">
              <div className="trust-icon">♙</div>

              <div>
                <h3>Unique Collectibles</h3>

                <p>Rare items you won't find elsewhere.</p>
              </div>
            </div>
          </aside>
        </section>

        {/* ===================================================
            SIMILAR ITEMS
        =================================================== */}

        <section className="similar-products-section">
          <div className="similar-products-heading">
            <h2>Similar Items You May Like</h2>

            <button type="button" onClick={onViewAllAuctions}>
              View All
            </button>
          </div>

          <div className="similar-products-grid">
            {similarAuctions.map((auction, index) => (
              <AuctionCard
                key={`${auction.title}-${index}`}
                image={auction.image}
                title={auction.title}
                seller={auction.seller}
                category={auction.category}
                timeLeft={auction.timeLeft}
                onProductClick={onProductDetails}
              />
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}

      <Footer />
    </>
  );
}
