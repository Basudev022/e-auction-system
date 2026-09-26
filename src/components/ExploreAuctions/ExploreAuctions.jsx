import frame from "../../assets/images/frame.png";
import painting1 from "../../assets/images/painting1.png";
import painting2 from "../../assets/images/painting2.png";
import watch from "../../assets/images/watch.png";

import AuctionCard from "../AuctionCard/AuctionCard";

import "./ExploreAuctions.css";

export default function ExploreAuctions({
  onViewAllAuctions,
  onProductDetails,
}) {
  const auctions = [
    {
      image: watch,
      title: "Vintage Watch 1960",
      seller: "David Samson",
      category: "Watches",
      timeLeft: "2h 15m",
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
      title: "Antique Frame",
      seller: "Robert Wilson",
      category: "Antiques",
      timeLeft: "4h 10m",
    },

    {
      image: painting1,
      title: "Modern Art Painting",
      seller: "Emma Thompson",
      category: "Art",
      timeLeft: "5h 30m",
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

    {
      image: watch,
      title: "Classic Gold Watch",
      seller: "Daniel Brown",
      category: "Watches",
      timeLeft: "8h 10m",
    },

    {
      image: painting1,
      title: "Contemporary Painting",
      seller: "Sophia Taylor",
      category: "Art",
      timeLeft: "9h 25m",
    },

    {
      image: painting2,
      title: "Traditional Oil Artwork",
      seller: "William Davis",
      category: "Art",
      timeLeft: "10h 15m",
    },

    {
      image: frame,
      title: "Rare Wooden Frame",
      seller: "David Samson",
      category: "Antiques",
      timeLeft: "11h 20m",
    },
  ];

  /* =========================================================
     FIRST 6 CARDS APPEAR IN THIS SECTION
  ========================================================= */

  const trendingAuctions = auctions.slice(0, 6);

  return (
    <section className="explore-section">
      {/* HEADING */}

      <div className="explore-heading">
        <div className="explore-heading-text">
          <h2>Explore More</h2>

          <h3>Explore trending auctions and discover items you might love.</h3>
        </div>

        <button
          type="button"
          className="explore-view-all"
          onClick={onViewAllAuctions}
        >
          Explore More
        </button>
      </div>

      {/* TRENDING AUCTIONS */}

      <div className="explore-grid">
        {trendingAuctions.map((auction, index) => (
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
  );
}
