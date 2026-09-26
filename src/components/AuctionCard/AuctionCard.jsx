import { useEffect, useMemo, useState } from "react";

import "./AuctionCard.css";

export default function AuctionCard({
  image,
  title,
  seller,
  category,
  timeLeft = "2h 15m",
  imageCount = 5,
  verified = true,
  onProductClick,
}) {
  /* =========================================================
     CONVERT TIME LEFT INTO SECONDS
  ========================================================= */

  const initialSeconds = useMemo(() => {
    if (typeof timeLeft === "number") {
      return Math.max(0, timeLeft);
    }

    const value = String(timeLeft).toLowerCase().trim();

    const hours = Number(value.match(/(\d+)\s*h/)?.[1] || 0);

    const minutes = Number(value.match(/(\d+)\s*m/)?.[1] || 0);

    const seconds = Number(value.match(/(\d+)\s*s/)?.[1] || 0);

    return hours * 3600 + minutes * 60 + seconds;
  }, [timeLeft]);

  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);

  /* =========================================================
     RESET WHEN TIME VALUE CHANGES
  ========================================================= */

  useEffect(() => {
    setRemainingSeconds(initialSeconds);
  }, [initialSeconds]);

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

    return () => clearInterval(timer);
  }, [remainingSeconds]);

  /* =========================================================
     TIME CALCULATION
  ========================================================= */

  const hours = Math.floor(remainingSeconds / 3600);

  const minutes = Math.floor((remainingSeconds % 3600) / 60);

  const seconds = remainingSeconds % 60;

  const formatTime = (value) => String(value).padStart(2, "0");

  /* =========================================================
     SELLER INITIAL
  ========================================================= */

  const sellerInitial = seller?.trim()?.charAt(0)?.toUpperCase() || "S";

  /* =========================================================
     OPEN PRODUCT DETAILS
  ========================================================= */

  const handleCardClick = () => {
    if (typeof onProductClick !== "function") {
      return;
    }

    onProductClick({
      image,
      title,
      seller,
      category,
      timeLeft,

      // Pass the CURRENT countdown
      remainingSeconds,

      imageCount,
      verified,
    });
  };

  /* =========================================================
     KEYBOARD ACCESSIBILITY
  ========================================================= */

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick();
    }
  };

  return (
    <article
      className="auction-card"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {/* =====================================================
          PRODUCT IMAGE
      ===================================================== */}

      <div className="auction-image-wrapper">
        <img src={image} alt={title} className="auction-image" />

        {/* VERIFIED */}

        {verified && (
          <div className="auction-verified">
            <span className="verified-check">✓</span>

            <span>Verified</span>
          </div>
        )}

        {/* WISHLIST */}

        <button
          type="button"
          className="auction-wishlist"
          aria-label="Add to wishlist"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          ♡
        </button>

        {/* IMAGE COUNT */}

        <div className="auction-image-count">
          <span className="image-count-icon">▧</span>

          <span>1 / {imageCount}</span>
        </div>
      </div>

      {/* =====================================================
          CARD CONTENT
      ===================================================== */}

      <div className="auction-card-content">
        {/* PRODUCT NAME */}

        <h3 className="auction-title">{title}</h3>

        {/* CATEGORY */}

        <div className="auction-category">
          <span className="category-icon">◉</span>

          <span>{category}</span>
        </div>

        {/* SELLER */}

        <div className="auction-seller">
          <div className="seller-avatar">{sellerInitial}</div>

          <div className="seller-details">
            <span className="seller-label">Seller</span>

            <span className="seller-name">{seller}</span>
          </div>
        </div>

        {/* ===================================================
            BOTTOM
        =================================================== */}

        <div className="auction-bottom">
          {/* TIME LEFT */}

          <div className="auction-time">
            <div className="time-details">
              <div className="countdown">
                {/* HOURS */}

                <div className="countdown-box">
                  <strong>{formatTime(hours)}</strong>

                  <small>HH</small>
                </div>

                <span className="countdown-separator">:</span>

                {/* MINUTES */}

                <div className="countdown-box">
                  <strong>{formatTime(minutes)}</strong>

                  <small>MM</small>
                </div>

                <span className="countdown-separator">:</span>

                {/* SECONDS */}

                <div className="countdown-box">
                  <strong>{formatTime(seconds)}</strong>

                  <small>SS</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
