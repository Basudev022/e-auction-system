import "./AuctionCard.css";
export default function AuctionCard({
  image,
  title,
  seller,
  category,
  timeLeft,
}) {
  return (
    <article className="auction-card">
      {/* IMAGE */}
      <div className="auction-card-image">
        <img src={image} alt={title} />

        <button
          type="button"
          className="auction-heart"
          aria-label={`Add ${title} to favourites`}
        >
          ♥
        </button>
      </div>

      {/* CONTENT */}
      <div className="auction-card-content">
        {/* PRODUCT TITLE */}
        <h3>{title}</h3>

        {/* CATEGORY */}
        <p className="auction-category">{category}</p>

        {/* SELLER */}
        <p className="auction-seller">{seller}</p>

        {/* TIME LEFT */}
        <div className="auction-card-details">
          <div>
            <span>Time Left</span>
            <strong>{timeLeft}</strong>
          </div>
        </div>

        {/* REGISTER */}
        <button type="button" className="auction-register">
          Register
        </button>
      </div>
    </article>
  );
}
