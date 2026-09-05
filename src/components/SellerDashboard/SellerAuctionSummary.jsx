import Icon from "../Icon/Icon";

export default function SellerAuctionSummary() {
  return (
    <div className="seller-summary-grid">
      {/* Total Auctions */}
      <div className="seller-summary-card">
        <div className="seller-summary-card-top">
          <div className="seller-summary-icon">
            <Icon name="gavel" size={20} />
          </div>

          <span className="seller-summary-label">Total Auctions</span>
        </div>

        <strong className="seller-summary-value">0</strong>

        <span className="seller-summary-description">All auctions created</span>
      </div>

      {/* Active Auctions */}
      <div className="seller-summary-card">
        <div className="seller-summary-card-top">
          <div className="seller-summary-icon">
            <Icon name="activity" size={20} />
          </div>

          <span className="seller-summary-label">Active Auctions</span>
        </div>

        <strong className="seller-summary-value">0</strong>

        <span className="seller-summary-description">Currently running</span>
      </div>

      {/* Ended Auctions */}
      <div className="seller-summary-card">
        <div className="seller-summary-card-top">
          <div className="seller-summary-icon">
            <Icon name="checkCircle" size={20} />
          </div>

          <span className="seller-summary-label">Ended Auctions</span>
        </div>

        <strong className="seller-summary-value">0</strong>

        <span className="seller-summary-description">
          Successfully completed
        </span>
      </div>

      {/* Total Earnings */}
      <div className="seller-summary-card">
        <div className="seller-summary-card-top">
          <div className="seller-summary-icon">
            <Icon name="creditCard" size={20} />
          </div>

          <span className="seller-summary-label">Total Earnings</span>
        </div>

        <strong className="seller-summary-value">₹0</strong>

        <span className="seller-summary-description">
          From completed auctions
        </span>
      </div>
    </div>
  );
}
