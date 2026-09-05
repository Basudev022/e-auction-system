import Icon from "../Icon/Icon";

export default function AuctionStatusOverview() {
  return (
    <div className="seller-status-overview-card">
      <div className="seller-section-heading">
        <div>
          <span className="seller-section-label">OVERVIEW</span>

          <h2>Auction Status Overview</h2>
        </div>

        <Icon name="barChart" size={20} />
      </div>

      <div className="seller-status-chart">
        {/* Chart data will be connected to backend */}
        <div className="seller-chart-empty">
          <div className="seller-chart-icon">
            <Icon name="barChart" size={26} />
          </div>

          <h3>No Auction Data</h3>

          <p>
            Auction status statistics will appear here once you create auctions.
          </p>
        </div>
      </div>

      {/* Status Legend */}
      <div className="seller-status-legend">
        <div className="seller-status-legend-item">
          <span className="seller-status-dot scheduled"></span>
          <span>Scheduled</span>
          <strong>0</strong>
        </div>

        <div className="seller-status-legend-item">
          <span className="seller-status-dot active"></span>
          <span>Active</span>
          <strong>0</strong>
        </div>

        <div className="seller-status-legend-item">
          <span className="seller-status-dot ended"></span>
          <span>Ended</span>
          <strong>0</strong>
        </div>

        <div className="seller-status-legend-item">
          <span className="seller-status-dot cancelled"></span>
          <span>Cancelled</span>
          <strong>0</strong>
        </div>
      </div>
    </div>
  );
}
