import Icon from "../Icon/Icon";

export default function SellerCreatedAuctions() {
  return (
    <div className="seller-created-auctions-card">
      <div className="seller-section-heading">
        <div>
          <span className="seller-section-label">AUCTIONS</span>

          <h2>Created Auctions</h2>
        </div>

        <span className="seller-auction-count">0 Auctions</span>
      </div>

      <div className="seller-created-auctions-list">
        {/* Auction data will be loaded from backend */}
        <div className="seller-empty-auctions">
          <div className="seller-empty-icon">
            <Icon name="gavel" size={26} />
          </div>

          <h3>No Auctions Created</h3>

          <p>Your created auctions will appear here.</p>
        </div>
      </div>
    </div>
  );
}
